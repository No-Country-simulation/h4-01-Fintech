import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from '../entitys/account.entity'

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwtToken(user: UserEntity, account?: AccountEntity): string {
    const payload = {
      sub: user.user_id,
      email: user.email,
      provider: account?.provider ?? 'credentials'
    };
    return this.jwtService.sign(payload);
  }
}
