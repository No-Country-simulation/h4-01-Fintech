import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entitys/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entitys/account.entity';
import { BalanceEntity } from '../entitys/balance.entity';
import { PortfolioEntity } from '../entitys/portfolio.entity';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
  ) {}

  async createCompleteUser() {
    const numberOfUsers = 2; // Aquí defines cuántos usuarios quieres crear
    for (let i = 0; i < numberOfUsers; i++) {
      // Crear un usuario
      const user = new UserEntity();
      user.name = faker.person.fullName();
      user.email = faker.internet.email();
      user.passwordhash = await bcrypt.hash('password123', 10);
      user.image = faker.image.avatar();
      const savedUser = await this.userRepository.save(user);
      console.log(`👤 Usuario creado: ${savedUser.name}`);

      // Crear cuenta asociada
      const account = new AccountEntity();
      account.userId = user.id;
      account.type = 'credentials'; // Tipo de cuenta "credentials"
      account.provider = 'Local'; // Esto indica que es una cuenta de tipo local (credenciales tradicionales)
      account.providerAccountId = uuidv4(); // Genera un UUID utilizando 'uuidv4'
      account.refresh_token = null; // No se usará en este caso
      account.access_token = null; // No se usará en este caso
      account.expires_at = null; // No se usará en este caso
      account.token_type = null; // No se usará en este caso
      account.scope = null; // No se usará en este caso
      account.id_token = null; // No se usará en este caso
      account.session_state = null; // No se usará en este caso
      account.oauth_token_secret = null; // No se usará en este caso
      account.oauth_token = null; // No se usará en este caso

      await this.accountRepository.save(account);
    }
  }
}