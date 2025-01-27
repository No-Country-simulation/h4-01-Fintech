import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { RiskService } from './risk.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthenticatedRequest } from 'src/middleware/auth.middleware';

@Controller('investment-risk')
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post()
  async calculate(@Req() req: AuthenticatedRequest) {
    const userId = req.user['sub'];
    return await this.riskService.calculateRisk(userId);
  }
}
