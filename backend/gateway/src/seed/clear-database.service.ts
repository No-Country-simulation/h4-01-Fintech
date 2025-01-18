import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entitys/user.entity';
import { AccountEntity } from 'src/entitys/account.entity';
import { QuestionEntity } from 'src/entitys/question.entity';
import { TransactionEntity } from 'src/entitys/transactions.entity';
import { PortfolioEntity } from 'src/entitys/portfolio.entity';
import { AssetEntity } from 'src/entitys/asset.entity';
import { MarketDataEntity } from 'src/entitys/marketData.entity';
import { BalanceEntity } from 'src/entitys/balance.entity';

@Injectable()
export class ClearDatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
    @InjectRepository(MarketDataEntity)
    private readonly marketDataRepository: Repository<MarketDataEntity>,
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
  ) {}

  async clearDatabase() {
    console.log('🧹 Limpiando la base de datos...');

    await this.transactionRepository.delete({});
    await this.portfolioRepository.delete({});
    await this.questionRepository.delete({});
    await this.accountRepository.delete({});
    await this.userRepository.delete({});
    await this.marketDataRepository.delete({});
    await this.assetRepository.delete({});
    await this.balanceRepository.delete({});

    console.log('✅ Todas las tablas han sido limpiadas correctamente.');
  }
}
