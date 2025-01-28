import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entities/account.entity';
import { BalanceEntity } from '../entities/balance.entity';
import { PortfolioEntity } from '../entities/portfolio.entity';
import {TransactionEntity} from '../entities/transactions.entity';
import {TypeTrans} from '../entities/enum/typeTransaction'
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { AssetEntity } from '../entities/asset.entity';

@Injectable()
export class SeedUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
  ) {}

  async createCompleteUser() {
    const numberOfTransactionsPerUser = 5;
    const numberOfUsers = 2; // Aquí defines cuántos usuarios quieres crear
    
    // Obtener todos los activos disponibles en la base de datos
    const assets = await this.assetRepository.find();
    if (assets.length === 0) {
      throw new Error('No hay activos disponibles en la base de datos.');
    }

    for (let i = 0; i < numberOfUsers; i++) {
      // Crear un usuario
      const user = new UserEntity();
      user.id = uuidv4()
      user.name = faker.person.fullName();
      user.email = faker.internet.email();
      user.passwordhash = await bcrypt.hash('@Aa1234567890', 10);
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

      // Crear transacciones para el usuario
      for (let j = 0; j < numberOfTransactionsPerUser; j++) {

        const randomAsset = assets[Math.floor(Math.random() * assets.length)];
        const transaction = new TransactionEntity();
        transaction.id = uuidv4()
        transaction.asset = randomAsset;
        transaction.quantity = parseFloat(faker.finance.amount());
        transaction.price = parseFloat(faker.finance.amount());
        transaction.transaction_type = faker.helpers.arrayElement([
          TypeTrans.ACCOUNT_FUNDING,
          TypeTrans.WITHDRAWAL,
          TypeTrans.INVESTMENT,
          TypeTrans.INVESTMENT_WITHDRAWAL,
        ]);
        transaction.location = faker.location.city();
        transaction.timestamp = faker.date.past();

        await this.transactionsRepository.save(transaction);
        console.log(`💸 Transacción creada para el usuario: ${savedUser.name}`);
      }
    }
  }
}