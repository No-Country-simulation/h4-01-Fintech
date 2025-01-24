import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AnswerEntity } from 'src/entities/answer.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { QuestionEntity } from 'src/entities/question.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService,AuthGuard, JwtService],
  imports: [UsersModule, QuestionsModule, TypeOrmModule.forFeature([UserEntity, QuestionEntity, AnswerEntity]),]
})
export class AnswersModule {}
