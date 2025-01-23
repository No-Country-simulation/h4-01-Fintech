import {
    Controller,
    Get,
    Request,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import {
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private usersService: UserService) {}

    @Get('profile')
    getProfile(@Request() req) {
        return this.usersService.getFullProfile(req.user.userId);
    }
}