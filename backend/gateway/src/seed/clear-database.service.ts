import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AccountEntity } from 'src/entities/account.entity';
import { QuestionEntity } from 'src/entities/question.entity';
import { TransactionEntity } from 'src/entities/transactions.entity';
import { PortfolioEntity } from 'src/entities/portfolio.entity';
import { AssetEntity } from 'src/entities/asset.entity';
import { MarketDataEntity } from 'src/entities/marketData.entity';
import { BalanceEntity } from 'src/entities/balance.entity';

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
