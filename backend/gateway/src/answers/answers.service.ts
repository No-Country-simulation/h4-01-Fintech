import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/entities/answer.entity';
import { Repository } from 'typeorm';
import { AddAnswerDto } from './dto/add-answer.dto';
import { UserService } from 'src/users/user.service';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>,
        private userService: UserService,
        private questionService: QuestionsService
    ) {}

    async addAnswer(userId: string, dto: AddAnswerDto) {
        const { questionId, answer } = dto;
        const user = await this.userService.findById(userId);
        if (!user) throw new BadRequestException('No existe usuario con este Id');
        const question = await this.questionService.findQuestionById(questionId);
        if (!question) throw new BadRequestException('No existe una pregunta con este Id');
        const questionAnswered = await this.answerRepository.findOne({
            where: {
                userId,
                questionId
            }
        });
        if (questionAnswered) throw new BadRequestException('La pregunta ha sido respondida');

        const createAnswer = this.answerRepository.create({
            userId: user.id,
            questionId,
            answer
        });
        await this.answerRepository.save(createAnswer);
        return {
            status: true,
            message: "La respuesta ha sido guardada"
        }
    }
}
