import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnvs } from './envs';
import { join } from 'path';
import { AccountEntity } from '../entitys/account.entity';
import { UserEntity } from '../entitys/user.entity';
import { AssetEntity } from '../entitys/asset.entity';
import { MarketDataEntity } from '../entitys/marketData.entity';
import { NotificationEntity } from '../entitys/notifications.entity';
import { PortfolioEntity } from '../entitys/portfolio.entity';
import { QuestionEntity } from '../entitys/question.entity';
import {TransactionEntity} from '../entitys/transactions.entity';
import { BalanceEntity } from 'src/entitys/balance.entity';

const isProduction = true;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: ConfigEnvs.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Permite conexiones sin verificar el certificado
  },
  synchronize: isProduction, // Solo habilitar en desarrollo
  entities: [
    AccountEntity,
    UserEntity,
    QuestionEntity,
    AssetEntity,
    TransactionEntity,
    MarketDataEntity,
    PortfolioEntity,
    NotificationEntity,
    BalanceEntity,
  ],
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  logging: isProduction, // Solo mostrar logs en desarrollo
};
