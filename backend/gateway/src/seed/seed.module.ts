import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AccountEntity } from '../entities/account.entity';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { TransactionEntity } from '../entities/transactions.entity';
import { AssetEntity } from '../entities/asset.entity';
import { QuestionEntity } from '../entities/question.entity'
import { MarketDataEntity } from '../entities/marketData.entity';
import { SeedUserService } from './seed-user.service';
import { BalanceEntity } from 'src/entities/balance.entity';
// import { SeedMarketDataService } from './seed-market-data.service';
import { AnswerEntity } from '../entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccountEntity,
      AssetEntity,
      TransactionEntity,
    ]),
  ],
  providers: [
    SeedService,
    SeedUserService,
  ],
})
export class SeedModule {}
