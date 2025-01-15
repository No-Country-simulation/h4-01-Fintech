import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entitys/user.entity';
import { UserService } from 'src/users/user.service';
import { LoginWithCredentialsDto } from './dto/login-credentials.dto';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvs} from '../config/envs'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
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
}
