import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigEnvs } from '../config/envs';
import { JwtService } from '@nestjs/jwt';
import { publicRoutes } from './routersPublics';
import { Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly algorithm = 'aes-256-gcm';
  private readonly secretKey = Buffer.from(ConfigEnvs.AES_SECRET_KEY, 'hex');

  constructor(private readonly jwtService: JwtService) {}

  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    Logger.log(`Middleware ejecutado en: ${req.originalUrl}`);
    if (this.isPublicRoute(req.originalUrl)) {
      Logger.log('Ruta pública detectada:', req.originalUrl);
      return next();
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Token no proporcionado o formato inválido',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      // ✅ Desencriptar primero el token antes de verificar
      const decryptedToken = this.decrypt(token);
      Logger.log('Token desencriptado correctamente.');

      const payload = this.jwtService.verify(decryptedToken, {
        secret: ConfigEnvs.JWT_SECRET,
      });
      req.user = { id: payload.sub };
      next();
    } catch (error) {
      Logger.error('Error al verificar el token:', error.message);
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  private decrypt(data: string): string {
    const [ivHex, authTagHex, encrypted] = data.split(':');
    if (!ivHex || !authTagHex || !encrypted) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');

    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      iv,
    );
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  private isPublicRoute(url: string): boolean {
    return publicRoutes.some((route) => url.startsWith(route));
  }
}
