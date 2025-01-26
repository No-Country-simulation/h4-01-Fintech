import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AddAnswerDto } from './dto/add-answer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/middleware/auth.middleware';
import { GetAnswersDto } from './dto/get-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async add(@Req() req: AuthenticatedRequest, @Body() dto: AddAnswerDto) {
    const userId = req.user['sub'];
    return await this.answersService.addAnswer(userId, dto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async get(@Req() req: AuthenticatedRequest, @Query() dto: GetAnswersDto) {
    const userId = req.user['sub'];
    return await this.answersService.getAnswers(userId, dto);
  }
}
