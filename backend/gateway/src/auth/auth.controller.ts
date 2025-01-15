import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { LoginWithCredentialsDto } from './dto/login-credentials.dto';
import { RegisterUserDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('social-login')
  async socialLogin(@Body() body) {
    const {
      type,
      provider,
      providerAccountId,
      refresh_token,
      //access_token,
      expires_at,
      token_type,
      email,
      image,
      name,
    } = body;

    // Busca al usuario por email
    let user = await this.userService.findByEmail(email);

    // Si no existe el usuario, créalo
    if (!user) {
      user = await this.userService.createUser({ email, name, image });
    }

    // Busca si ya existe una cuenta asociada al proveedor
    const account = await this.userService.findAccountByProvider(
      provider,
      providerAccountId,
    );

    // Si no existe la cuenta, créala
    if (!account) {
      await this.userService.createAccount({
        userId: user.id,
        type,
        provider,
        providerAccountId,
        refresh_token,
        expires_at,
        token_type,
      });
    }

    // Genera el token JWT para la sesión
    const token = this.authService.generateJwtToken(user);

    console.log('Respuesta enviada al frontend:', { token });

    return { 
      id: user.id,
      token: token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginWithCredentialsDto) {
    return this.authService.login(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    return this.authService.registerUser(dto);
  }
}
