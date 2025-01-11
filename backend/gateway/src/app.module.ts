import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.middleware';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'my_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
