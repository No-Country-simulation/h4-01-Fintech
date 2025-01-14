import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigEnvs } from './config/envs';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Logger, LogLevel, RequestMethod, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  app.useLogger(logLevels);
  app.setGlobalPrefix('api', {
    exclude: [{path: '/', method: RequestMethod.GET}]
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('IUPI API Documentation')
    .setDescription('IUPI, Ahorra e inversiones')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
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
