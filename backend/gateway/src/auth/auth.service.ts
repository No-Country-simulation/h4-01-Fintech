import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entities/user.entity';
import { UserService } from 'src/users/user.service';
import { LoginWithCredentialsDto } from './dto/login-credentials.dto';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvs} from '../config/envs'
import { RegisterUserWithEmailAndPasswordDto } from './dto/register-user-password.dto';
import { EmailService } from 'src/email/email.service';
import * as bcrypt from 'bcrypt';

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
    if (!user) throw new UnauthorizedException('Credenciales no válidas');
    const isValidPassword = await bcrypt.compare(
      dto.password,
      user.passwordhash,
    );
    if (!isValidPassword)
      throw new UnauthorizedException('Credenciales no válidas');
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    const secret =
      this.configService.get<string>('JWT_SECRET') || ConfigEnvs.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no definido');
    }

    const token = await this.jwtService.signAsync(payload, {
      secret: secret,
    });

    return {
      status: true,
      message: 'Incio de sesión exitoso',
      access_token: token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
    };
  }

  generateJwtToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
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
      status: true,
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
    const token = this.jwtService.sign(email, { secret });
    const isSent: boolean = await this.emailService.sendVerificationEmail(
      email,
      token,
    );
    if (!isSent) {
      throw new InternalServerErrorException('Error enviando el email');
    }

    return true;
  }

  async validateEmail(token: string) {
    let payload;

    // Validación inicial del token
    if (!token || typeof token !== 'string') {
      console.error('Token ausente o malformado');
      throw new UnauthorizedException('Token ausente o inválido');
    }

    try {
      // Verificación del token
      payload = this.jwtService.verify(token, {
        secret: ConfigEnvs.JWT_SECRET,
      });
    } catch (error) {
      // Manejo de errores específicos del JWT
      if (error.name === 'TokenExpiredError') {
        console.error('Error: Token expirado', error.message);
        throw new UnauthorizedException('Token expirado');
      }

      if (error.name === 'JsonWebTokenError') {
        console.error('Error: Token malformado', error.message);
        throw new UnauthorizedException('Token inválido');
      }

      // Otros errores inesperados
      console.error('Error inesperado al verificar el token:', error.message);
      throw new InternalServerErrorException('Error al validar el token');
    }

    // Validación de contenido del payload
    const email = payload?.email;
    if (!email) {
      console.error('El token no contiene un email válido:', payload);
      throw new BadRequestException('Token incorrecto o malformado');
    }

    // Validar usuario en la base de datos
    const user = await this.userService.findByEmail(email);
    if (!user || user.token_expires_at < new Date()) {
      console.error('Usuario no encontrado o token expirado:', { email });
      throw new BadRequestException('Usuario no encontrado o token expirado');
    }

    // Activar usuario
    try {
      await this.userService.activateUser(email);
    } catch (error) {
      console.error('Error al activar el usuario:', error.message);
      throw new InternalServerErrorException('No se pudo activar la cuenta');
    }

    // Respuesta exitosa
    return {
      success: true,
      message: 'Cuenta activada correctamente',
      email,
    };
  }

  async resendVerificationEmail(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.is_validated_email) {
      throw new BadRequestException('El email ya está validado');
    }
    const token = this.jwtService.sign(email, {
      secret: ConfigEnvs.JWT_SECRET,
    });
    user.token_expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas
    await this.userService.activateUser(email);
    try {
      await this.emailService.sendVerificationEmail(user.email, token);
      return {
        success: true,
        message: 'Email de verificación reenviado exitosamente',
      };
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw new InternalServerErrorException(
        'Error al enviar el email de verificación',
      );
    }
  }
}
