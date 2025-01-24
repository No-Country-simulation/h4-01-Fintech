import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/entities/question.entity';
import { RbacModule } from 'src/rbac/rbac.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/rbac/role.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService, AuthGuard, RoleGuard, JwtService],
  imports: [RbacModule, TypeOrmModule.forFeature([QuestionEntity])],
  exports: [QuestionsService]
})
export class QuestionsModule {}
