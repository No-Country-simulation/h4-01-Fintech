import { Controller, Post, Body, HttpCode, HttpStatus, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { LoginWithCredentialsDto } from './dto/login-credentials.dto';
import { RegisterUserWithEmailAndPasswordDto } from './dto/register-user-password.dto';
import { ResendVerificationDto } from './dto/resend-verification.dto';
import {
  Logger
} from '@nestjs/common';

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
      //refresh_token,
      //access_token,
      //expires_at,
      //token_type,
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
        //refresh_token,
        //expires_at,
        //token_type,
      });
    }

    // Genera el token JWT para la sesión
    const token = this.authService.generateJwtToken(user);

    console.log('Respuesta enviada al frontend:', { token });
    const resp = {
      status: true,
      message: 'Incio de sesión exitoso',
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        risk_percentage: user.risk_percentage,
      },
    };
    Logger.log('respuesta enviada',resp);
    return resp;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginWithCredentialsDto) {
    const response = await this.authService.login(dto); // Espera a que se resuelva la promesa
    console.log(response); // Ahora imprime la respuesta real
    return response; // Devuelve la respuesta de la API
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() dto: RegisterUserWithEmailAndPasswordDto) {
    return this.authService.registerUser(dto);
  }

  @Get('validate/:token')
  async validateEmail(@Param('token') token: string, @Res() res: Response) {
    try {
      const result = await this.authService.validateEmail(token);
      if (result.success) {
        return res.json(result);
      } else {
        return res.redirect(
          `${process.env.FRONTEND_URL}/email-validation-failed`,
        );
      }
    } catch (error) {
      console.error('Error en validación:', error);
      return res.redirect(
        `${process.env.FRONTEND_URL}/email-validation-failed`,
      );
    }
  }

  @Post('resend-verification')
  async resendVerification(@Body() dto: ResendVerificationDto) {
    return await this.authService.resendVerificationEmail(dto.email);
  }
}
