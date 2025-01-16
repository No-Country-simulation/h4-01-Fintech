import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnvs } from './envs';
import { join } from 'path';
import { AccountEntity } from '../entities/account.entity';
import { UserEntity } from '../entities/user.entity';
import { AssetEntity } from '../entities/asset.entity';
import { MarketData } from '../entities/marketData.entity';
import { NotificationEntity } from '../entities/notifications.entity';
import { PortfolioEntity } from '../entities/portfolio.entity';
import { QuestionEntity } from '../entities/question.entity';
import {TransactionEntity} from '../entities/transactions.entity';

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
    MarketData,
    PortfolioEntity,
    NotificationEntity

  ],
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  logging: isProduction, // Solo mostrar logs en desarrollo
};
