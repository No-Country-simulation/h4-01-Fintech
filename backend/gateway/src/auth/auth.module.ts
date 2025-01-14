import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from 'src/entitys/account.entity';
import { ConfigEnvs } from 'src/config/envs';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity]),
    JwtModule.register({
      secret: ConfigEnvs.JWT_SECRET as string,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService, UserService],
})
export class AuthModule {}
