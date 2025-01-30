import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionDto } from './dto/add-question.dto';
import { GetQuestionsDto } from './dto/get-questions.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>
    ) {}

    async addQuestion(dto: QuestionDto) {
        const { question, order, minRange, maxRange, minRangeLabel, maxRangeLabel } = dto;
        const questionExists = await this.questionRepository.findOne({ where: { order }});
        if (questionExists) throw new BadRequestException('El orden de las preguntas debe ser único');
        const newQuestion = this.questionRepository.create({
            question,
            order,
            minRange,
            maxRange,
            minRangeLabel,
            maxRangeLabel
        });
        await this.questionRepository.save(newQuestion);
        return {
            status: true,
            message: 'La pregunta ha sido añadida con éxito'
        }
    }

    async getQuestions(dto?: GetQuestionsDto) {
        const { page = 1, limit = 10 } = dto || {};
        const skip = (page - 1) * limit;
        const [items, total] = await this.questionRepository.findAndCount({
            skip,
            take: limit,
            order: {
                order: 'ASC'
            },
            where: {
                isDeleted: false
            }
        });
        return {
            status: true,
            message: null,
            data: {
                questions: items,
                total,
                page,
                limit,totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPreviousPage: page > 1
            }
        }
    }

    async updateQuestion(id: string, dto: UpdateQuestionDto) {
        const { question, order, minRange, maxRange, minRangeLabel, maxRangeLabel } = dto;
        if (!question && !order && !minRange && !maxRange && !minRangeLabel && !maxRangeLabel)
            throw new BadRequestException('No hay parámetro para actualizar la pregunta');
        const questionExist = await this.questionRepository.findOne({ where: { id }});
        if (!questionExist) throw new BadRequestException('No se encontró ninguna pregunta con este Id');
        questionExist.question = question ? question : questionExist.question;
        questionExist.order = order ? order : questionExist.order;
        questionExist.minRange = minRange ? minRange : questionExist.minRange;
        questionExist.maxRange = maxRange ? maxRange : questionExist.maxRange;
        questionExist.minRangeLabel = minRangeLabel ? minRangeLabel : questionExist.minRangeLabel;
        questionExist.maxRangeLabel = maxRangeLabel ? maxRangeLabel : questionExist.maxRangeLabel;
        await this.questionRepository.save(questionExist);
        return {
            status: true,
            message: 'La pregunta se actualizó correctamente',
            data: questionExist
        }
    }

    async deleteQuestion(id: string, isDeleted: string) {
        if (isDeleted !== 'true' && isDeleted !== 'false') throw new BadRequestException('Falta el parámetro isDeleted')
        const question = await this.questionRepository.findOne({ where: { id }});
        if (!question) throw new BadRequestException('No hay ninguna pregunta con este Id');
        question.isDeleted = isDeleted === 'true';
        await this.questionRepository.save(question);
        return {
            status: true,
            message: `La pregunta ha sido ${isDeleted === 'true' ? 'eliminada' : 'restaurada'} con éxito`
        }
    }

    async findQuestionById(id: string): Promise<QuestionEntity | undefined> {
        return await this.questionRepository.findOne({ where: { id }});
    }
}
