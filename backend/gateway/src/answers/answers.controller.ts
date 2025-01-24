import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AddAnswerDto } from './dto/add-answer.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/middleware/auth.middleware';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async add(@Req() req: AuthenticatedRequest, @Body() dto: AddAnswerDto) {
    const userId = req.user['id'];
    return await this.answersService.addAnswer(userId, dto);
  }
}
