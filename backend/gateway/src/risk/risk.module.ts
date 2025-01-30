import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { RiskController } from './risk.controller';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/rbac/role.guard';
import { JwtService } from '@nestjs/jwt';
import { RbacModule } from 'src/rbac/rbac.module';
import { UsersModule } from 'src/users/users.module';
import { AnswersModule } from 'src/answers/answers.module';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  controllers: [RiskController],
  providers: [RiskService, AuthGuard, RoleGuard, JwtService],
  imports: [RbacModule, UsersModule, AnswersModule, QuestionsModule],
})
export class RiskModule {}
