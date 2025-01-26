import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/entities/answer.entity';
import { Repository } from 'typeorm';
import { AddAnswerDto } from './dto/add-answer.dto';
import { UserService } from 'src/users/user.service';
import { QuestionsService } from 'src/questions/questions.service';
import { GetAnswersDto } from './dto/get-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

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

    async getAnswers(userId: string, dto: GetAnswersDto) {
        const { page = 1, limit = 10 } = dto || {};
        const skip = (page - 1) * limit;
        const user = await this.userService.findById(userId);
        if (!user) throw new BadRequestException('No existe usuario con este Id');
        const [items, total] = await this.answerRepository.findAndCount({
            skip,
            take: limit,
            where: {
                userId,
            }
        });
        return {
            status: true,
            message: null,
            data: {
                answers: items,
                total,
                page,
                limit,totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPreviousPage: page > 1
            }
        }
    }

    async updateAnswer(userId: string, answerId: string, dto: UpdateAnswerDto) {
        const { answer } = dto;
        const user = await this.userService.findById(userId);
        if (!user) throw new BadRequestException('No existe usuario con este Id');
        const answerFound = await this.answerRepository.findOne({
            where: {
                id: answerId,
                userId
            }
        });
        if (!answerFound) throw new BadRequestException('No existe una respuesta para esta pregunta');
        answerFound.answer = answer;
        await this.answerRepository.save(answerFound);
        return {
            status: true,
            message: 'La respuesta ha sido actualizada'
        }
    }
}
