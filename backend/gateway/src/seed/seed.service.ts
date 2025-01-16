import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entitys/user.entity';
import { AccountEntity } from 'src/entitys/account.entity';
import { QuestionEntity } from 'src/entitys/question.entity';
import { TransactionEntity } from 'src/entitys/transactions.entity';
import { TypeTrans} from 'src/entitys/enum/typeTransaction';
import { PortfolioEntity } from 'src/entitys/portfolio.entity';
import { AssetEntity } from 'src/entitys/asset.entity';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(PortfolioEntity)
    private readonly portfolioRepository: Repository<PortfolioEntity>,
    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
  ) {}

  async runSeed() {
    console.log('🚨 Limpiando la base de datos...');
    await this.clearDatabase();

    console.log('🌱 Iniciando la creación de datos de prueba...');
    for (let i = 0; i < 2; i++) {
      await this.createCompleteUser();
    }
    console.log('✅ Datos de prueba generados correctamente.');
  }

  // 🧹 Limpia TODAS las tablas de la base de datos antes de iniciar
  private async clearDatabase() {
    await this.transactionRepository.delete({});
    await this.portfolioRepository.delete({});
    await this.questionRepository.delete({});
    await this.accountRepository.delete({});
    await this.userRepository.delete({});
    await this.assetRepository.delete({});
  }

  // 🧑‍💼 Crea un usuario con todas sus propiedades
  private async createCompleteUser() {
    // Crear un usuario
    const user = new UserEntity();
    user.name = faker.name.firstName() + ' ' + faker.name.lastName();
    user.email = faker.internet.email();
    user.passwordhash = await bcrypt.hash('password123', 10);
    user.image = faker.image.avatar();
    const savedUser = await this.userRepository.save(user);
    console.log(`👤 Usuario creado: ${savedUser.name}`);

    // Crear cuenta asociada
    const account = new AccountEntity();
    account.userId = user.id;
    account.type = 'credentials'; // Tipo de cuenta "credentials"
    account.provider = 'Local';  // Esto indica que es una cuenta de tipo local (credenciales tradicionales)
    account.providerAccountId = uuidv4(); // Genera un UUID utilizando 'uuidv4'
    account.refresh_token = null; // No se usará en este caso
    account.access_token = null;  // No se usará en este caso
    account.expires_at = null;   // No se usará en este caso
    account.token_type = null;   // No se usará en este caso
    account.scope = null;        // No se usará en este caso
    account.id_token = null;     // No se usará en este caso
    account.session_state = null; // No se usará en este caso
    account.oauth_token_secret = null; // No se usará en este caso
    account.oauth_token = null;       // No se usará en este caso

    await this.accountRepository.save(account);

    const question = new QuestionEntity();
    question.userId = user.id;
    question.p_q1 = faker.number.int({ min: 1, max: 10 });
    question.p_q2 = faker.number.int({ min: 1, max: 10 });
    question.p_q3 = faker.number.int({ min: 1, max: 10 });
    question.p_q4 = faker.number.int({ min: 1, max: 10 });
    question.p_q5 = faker.number.int({ min: 1, max: 10 });
    question.p_q6 = faker.number.int({ min: 1, max: 10 });
    question.p_q7 = faker.number.int({ min: 1, max: 10 });

    await this.questionRepository.save(question);

    const transaction = new TransactionEntity();
    transaction.user = user;
    transaction.asset = await this.assetRepository.findOneBy({});
    transaction.quantity = parseFloat(faker.finance.amount());
    transaction.price = parseFloat(faker.finance.amount());
    transaction.transaction_type = faker.helpers.arrayElement(
      Object.values(TypeTrans),
    );
    transaction.location = faker.location.city();

    await this.transactionRepository.save(transaction);
  }
}