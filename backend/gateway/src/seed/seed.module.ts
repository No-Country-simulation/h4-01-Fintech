import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/account.entity';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { TransactionEntity } from '../entities/transactions.entity';
import { AssetEntity } from '../entities/asset.entity';
import { SeedUserService } from './seed-user.service';
import { BalanceEntity } from 'src/entities/balance.entity';
import  { GoalEntity} from '../entities/goals.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccountEntity,
      AssetEntity,
      TransactionEntity,
      GoalEntity,
      PortfolioEntity,
      BalanceEntity,
    ]),
  ],
  providers: [SeedService, SeedUserService],
})
export class SeedModule {}
