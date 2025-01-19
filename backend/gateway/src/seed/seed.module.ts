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
import { MarketDataApiService } from '../services/market-data-api.service'
import { SeedUserService } from './seed-user.service';
import { BalanceEntity } from 'src/entities/balance.entity';
import { ClearDatabaseService } from './clear-database.service';
// import { SeedMarketDataService } from './seed-market-data.service';
import { AnswerEntity } from '../entities/answer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccountEntity,
      BalanceEntity,
      QuestionEntity,
      PortfolioEntity,
      AssetEntity,
      TransactionEntity,
      MarketDataEntity,
      AnswerEntity,
    ]),
  ],
  providers: [
    SeedService,
    MarketDataApiService,
    SeedUserService,
    ClearDatabaseService,
    // SeedMarketDataService,
  ],
})
export class SeedModule {}
