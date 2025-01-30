import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/account.entity';
import { BalanceEntity} from '../entities/balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity, BalanceEntity])], // ✅ Repos registrados aquí
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
