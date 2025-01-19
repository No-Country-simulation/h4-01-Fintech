import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnvs } from './envs';
import { join } from 'path';
import { AccountEntity } from '../entities/account.entity';
import { UserEntity } from '../entities/user.entity';
import { AssetEntity } from '../entities/asset.entity';
import { MarketDataEntity } from '../entities/marketData.entity';
import { NotificationEntity } from '../entities/notifications.entity';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { TransactionEntity } from '../entities/transactions.entity';
import { BalanceEntity} from '../entities/balance.entity';
import { AnswerEntity } from '../entities/answer.entity';
import { QuestionEntity } from '../entities/question.entity';

const isProduction = ConfigEnvs.NODE_ENV === 'production';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: ConfigEnvs.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Permite conexiones sin verificar el certificado
  },
  synchronize: !isProduction, // Solo habilitar en desarrollo
  entities: [
    AccountEntity,
    UserEntity,
    AssetEntity,
    QuestionEntity,
    AssetEntity,
    TransactionEntity,
    MarketDataEntity,
    PortfolioEntity,
    NotificationEntity,
    BalanceEntity,
    AnswerEntity,
  ],
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  logging: isProduction, // Solo mostrar logs en desarrollo
};
