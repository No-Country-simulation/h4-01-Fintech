import { Logger } from '@nestjs/common';
import 'dotenv/config';
//dotenv.config();

export class ConfigEnvs {
  static PORT = process.env.PORT_GATEWAY;
  static NODE_ENV = process.env.NODE_ENV || 'development';
  static POSTGRES_URL = process.env.POSTGRES_URL;
  static JWT_SECRET = process.env.JWT_SECRET;
}
console.log('Variables de entorno GateWay:', process.env);
Logger.log('Variables de entorno GateWay:', process.env);
