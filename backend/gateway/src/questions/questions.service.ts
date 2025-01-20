import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { QuestionDto } from './dto/add-question.dto';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>
    ) {}

    async addQuestion(dto: QuestionDto) {
        const { question, order } = dto;
        const newQuestion = this.questionRepository.create({
            question,
            order
        });
        await this.questionRepository.save(newQuestion);
        return {
            status: true,
            message: 'La pregunta ha sido añadida con éxito'
        }
    }
}
