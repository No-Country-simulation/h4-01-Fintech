import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionDto } from './dto/add-question.dto';
import { GetQuestionsDto } from './dto/get-questions.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>
    ) {}

    async addQuestion(dto: QuestionDto) {
        const { question, order, minRange, maxRange, minRangeLabel, maxRangeLabel } = dto;
        const newQuestion = this.questionRepository.create({
            question,
            order,
            minRange,
            maxRange,
            minRangeLabel,
            maxRangeLabel
        });
        const questionExists = await this.questionRepository.find({ where: { order }});
        if (questionExists) throw new BadRequestException('El orden de las preguntas debe ser único');
        await this.questionRepository.save(newQuestion);
        return {
            status: true,
            message: 'La pregunta ha sido añadida con éxito'
        }
    }

    async getQuestions(dto: GetQuestionsDto) {
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
}
