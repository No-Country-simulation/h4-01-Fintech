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
    try {
      console.log('🧹 Limpiando la base de datos...');

      // Borrar las tablas en un orden adecuado (de las más dependientes a las menos dependientes)
      await this.transactionRepository.delete({});
      console.log('✅ Transacciones borradas.');

      await this.portfolioRepository.delete({});
      console.log('✅ Portfolios borrados.');

      await this.questionRepository.delete({});
      console.log('✅ Preguntas borradas.');

      await this.accountRepository.delete({});
      console.log('✅ Cuentas borradas.');

      await this.userRepository.delete({});
      console.log('✅ Usuarios borrados.');

      await this.marketDataRepository.delete({});
      console.log('✅ Datos de mercado borrados.');

      await this.assetRepository.delete({});
      console.log('✅ Activos borrados.');

      await this.balanceRepository.delete({});
      console.log('✅ Balances borrados.');

      console.log('✅ Todas las tablas han sido limpiadas correctamente.');
    } catch (error) {
      console.error('Error al limpiar la base de datos:', error);
    }
  }
}
