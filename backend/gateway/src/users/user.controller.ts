import {
    Body,
    Controller,
    Get,
    Patch,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import {
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDto } from 'src/auth/dto/register-user-password.dto';

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

    @UseGuards(AuthGuard)
    @Patch('profile')
    updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(req.user.userId, updateUserDto);
    }
}