import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/add-question.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/rbac/role.guard';
import { Roles } from 'src/rbac/metadata/role.metadata';
import { Role } from 'src/rbac/roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @Post()
  async add(@Body() dto: QuestionDto) {
    return await this.questionsService.addQuestion(dto);
  }
}
