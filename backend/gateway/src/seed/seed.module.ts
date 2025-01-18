import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from '../entitys/account.entity';
import { PortfolioEntity } from '../entitys/portfolio.entity';
import { TransactionEntity } from '../entitys/transactions.entity';
import { AssetEntity } from '../entitys/asset.entity';
import { QuestionEntity } from '../entitys/question.entity'
import { MarketDataEntity } from '../entitys/marketData.entity';
import { MarketDataApiService } from '../services/market-data-api.service'
import { SeedUserService } from './seed-user.service';
import { BalanceEntity } from 'src/entitys/balance.entity';
import { ClearDatabaseService } from './clear-database.service';
import { SeedMarketDataService } from './seed-market-data.service';
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
    ]),
  ],
  providers: [
    SeedService,
    MarketDataApiService,
    SeedUserService,
    ClearDatabaseService,
    SeedMarketDataService,
  ],
})
export class SeedModule {}
