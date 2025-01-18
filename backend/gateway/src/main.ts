import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigEnvs } from './config/envs';
import * as cookieParser from 'cookie-parser';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { Logger, LogLevel, RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logLevels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  app.useLogger(logLevels);
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,POST,PUT,DELETE,OPTIONS',
  });
  app.use(cookieParser());
  const jwtService = app.get(JwtService);
  const authMiddleware = new AuthMiddleware(jwtService);
  app.use(authMiddleware.use.bind(authMiddleware));
  const config = new DocumentBuilder()
    .setTitle('IUPI API Documentation')
    .setDescription('IUPI, Ahorra e inversiones')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Ejecutar la semilla solo en desarrollo
  if (ConfigEnvs.NODE_ENV === 'development') {
    const seedService = app.get(SeedService);
    await seedService.execute() // Ejecutar la semilla antes de iniciar el servidor
    Logger.log('Semilla ejecutada correctamente.');
  }
  
  const port = ConfigEnvs.PORT;
  await app.listen(port, () => {
    Logger.log(`Application is running on: http://localhost:${port}`);
  });
}
bootstrap().catch((err) => {
  Logger.log('Global error handler');
  Logger.log(err);
  Logger.log('----------------------------------------------------------');
});
