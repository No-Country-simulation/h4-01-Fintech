import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AddAnswerDto } from './dto/add-answer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async add(@Body() dto: AddAnswerDto) {
    return await this.answersService.addAnswer(dto);
  }
}
