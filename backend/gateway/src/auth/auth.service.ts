import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../entitys/user.entity';
import * as crypto from 'crypto';
import { ConfigEnvs } from 'src/config/envs';

const AES_SECRET_KEY = ConfigEnvs.AES_SECRET_KEY

@Injectable()
export class AuthService {
  private readonly algorithm = 'aes-256-gcm'; // AES-256 con GCM para autenticación y cifrado
  private readonly secretKey = Buffer.from(AES_SECRET_KEY, 'hex'); // Clave secreta en formato hexadecimal

  constructor(private jwtService: JwtService) {}

  generateJwtToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);
    return this.encrypt(token); // Cifrar el token antes de devolverlo
  }

  private encrypt(data: string): string {
    const iv = crypto.randomBytes(16); // Generar IV aleatorio para cada cifrado
    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex'); // Obtener el tag de autenticación
    return `${iv.toString('hex')}:${authTag}:${encrypted}`; // Concatenar IV, AuthTag y datos cifrados
  }

  // fution para SIFRAR LSO DATOS,
  decrypt(data: string): string {
    const parts = data.split(':');
    if (parts.length !== 3) {
      throw new Error('Invalid encrypted data format');
    }

    const [ivHex, authTagHex, encrypted] = parts;
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
}
