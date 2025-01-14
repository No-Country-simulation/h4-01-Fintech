import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnvs } from './envs';
import { join } from 'path';
import {AccountEntity} from '../entitys/account.entity';
import {UserEntity} from '../entitys/user.entity';

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
    UserEntity
  ],
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  logging: isProduction, // Solo mostrar logs en desarrollo
};
