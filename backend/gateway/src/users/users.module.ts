import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from '../entitys/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])], // ✅ Repos registrados aquí
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
