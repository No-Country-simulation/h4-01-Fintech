import {
    Controller,
    Get,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import {
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private usersService: UserService) {}

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.getFullProfile(req.user.userId);
    }
}