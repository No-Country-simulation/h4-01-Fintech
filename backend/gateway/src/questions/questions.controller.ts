import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionDto } from './dto/add-question.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/rbac/role.guard';
import { Roles } from 'src/rbac/metadata/role.metadata';
import { Role } from 'src/rbac/roles';
import { ApiTags } from '@nestjs/swagger';
import { GetQuestionsDto } from './dto/get-questions.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

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

  @UseGuards(AuthGuard)
  @Get()
  async getQuestions(@Query() paginationQuery: GetQuestionsDto) {
  return this.questionsService.getQuestions(paginationQuery);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @Delete('/:id')
  async deleteQuestion(@Param('id') id: string, @Query('isDeleted') isDeleted: string) {
    return this.questionsService.deleteQuestion(id, isDeleted);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.MODERATOR, Role.ADMIN)
  @Patch('/:id')
  async updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(id, dto);
  }
}
