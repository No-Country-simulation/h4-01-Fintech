import { Injectable } from '@nestjs/common';
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
}
