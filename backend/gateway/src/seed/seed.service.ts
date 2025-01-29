import { Injectable } from '@nestjs/common';
import { SeedUserService } from './seed-user.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly seedUsersService: SeedUserService,
  ) {}

  async execute() {
    console.log('🚀 Iniciando el proceso de seed de datos...');
    try {

      console.log('👤 Generando usuarios...');
      await this.seedUsersService.createCompleteUser();

      console.log('✅ Seed de datos completado exitosamente.');
    } catch (error) {
      console.error('❌ Error durante el proceso de seed:', error);
    }
  }
}
