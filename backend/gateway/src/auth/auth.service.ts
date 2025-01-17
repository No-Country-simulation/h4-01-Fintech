import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entitys/user.entity';
import { UserService } from 'src/users/user.service';
import { LoginWithCredentialsDto } from './dto/login-credentials.dto';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvs } from '../config/envs';
import { RegisterUserWithEmailAndPasswordDto } from './dto/register-user-password.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async login(dto: LoginWithCredentialsDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credenitals');
    const payload = {
      email: user.email,
      sub: user.id,
    };
    const secret =
      this.configService.get<string>('JWT_SECRET') || ConfigEnvs.JWT_SECRET;
    console.log('JWT_SECRET en uso:', secret); // <-- Depuración
    if (!secret) {
      throw new Error('JWT_SECRET no definido');
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: secret,
    });

    return {
      message: 'Incio de sesión exitoso',
      access_token: token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  generateJwtToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const secret =
      this.configService.get<string>('JWT_SECRET') || ConfigEnvs.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no definido');
    }

    return this.jwtService.sign(payload, { secret });
  }

  async registerUser(dto: RegisterUserWithEmailAndPasswordDto) {
    const user = await this.userService.createUserWithEmailAndPassword(dto);
    await this.sendEmailValidationLink(dto.email);
    return {
      message: 'Usuario creado con éxito',
      data: user,
    };
  }

  private async sendEmailValidationLink(email: string) {
    const secret =
      this.configService.get<string>('JWT_SECRET') || ConfigEnvs.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no definido');
    }
    const token = this.jwtService.sign(email, { secret});
    const isSent: boolean = await this.emailService.sendVerificationEmail(email, token);
    if (!isSent) {
      throw new InternalServerErrorException('Error sending email');
    }

    return true;
  }

  async validateEmail(token: string) {
    let payload;
    try {
      payload = this.jwtService.verify(token, {secret: ConfigEnvs.JWT_SECRET});
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token');
    }

    const email  = payload;
    if (!email) {
      throw new InternalServerErrorException('Email not in token');
    }

    const user = await this.userService.findByEmail(email);
    if (!user || user.token_expires_at < new Date()) {
      throw new BadRequestException('User not found or token expired');
    }
    await this.userService.activateUser(email)
    return { success: true, message: 'Email successfully validated', email };
  }
}
