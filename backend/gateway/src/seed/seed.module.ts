import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from '../entitys/account.entity';
import { PortfolioEntity } from '../entitys/portfolio.entity';
import { TransactionEntity } from '../entitys/transactions.entity';
import { AssetEntity } from '../entitys/asset.entity';
import { QuestionEntity } from '../entitys/question.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AccountEntity,
      QuestionEntity,
      PortfolioEntity,
      TransactionEntity,
      AssetEntity,
    ]),
  ],
  providers: [SeedService],
})
export class SeedModule {}
