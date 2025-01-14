import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('social-login')
  async socialLogin(@Body() body) {
    const { provider, providerAccountId, email } = body;
    console.log('este email pasa por el controlador', email)
    let user = await this.userService.findByEmail(email);

    if (!user) {
      user = await this.userService.createSocialUser({
        email,
        provider,
        providerAccountId,
      });
    }

    const account = await this.userService.findAccountByProvider(
      email,
      provider,
    );
    const token = this.authService.generateJwtToken(user, account);
    console.log('este es el token', token)
    return { token };
  }
}
