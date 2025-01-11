import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigEnvs } from './config/envs';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { Logger, LogLevel } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  app.useLogger(logLevels);
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
  });
  app.use(cookieParser());
  const jwtService = app.get(JwtService);
  const authMiddleware = new AuthMiddleware(jwtService);
  app.use(authMiddleware.use.bind(authMiddleware));
  const port = ConfigEnvs.PORT
  await app.listen(port,()=> {
    Logger.log(`Application is running on: http://localhost:${port}`);
  });
  
}
bootstrap().catch((err) => {
  Logger.log('Global error handler');
  Logger.log(err);
  Logger.log('----------------------------------------------------------');
});
