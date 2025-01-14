import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entitys/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwtToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
