import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnvs } from './envs';
import { join } from 'path';

const isProduction = true;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: ConfigEnvs.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // Permite conexiones sin verificar el certificado
  },
  synchronize: isProduction, // Solo habilitar en desarrollo
  entities: [join(__dirname, '/../**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  logging: isProduction, // Solo mostrar logs en desarrollo
};
