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
import { MarketDataEntity } from 'src/entitys/marketData.entity';

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
    @InjectRepository(MarketDataEntity)
    private readonly marketDataRepository: Repository<MarketDataEntity>,
  ) {}

  async runSeed() {
    console.log('🚨 Limpiando la base de datos...');
    await this.clearDatabase();

    console.log('🌱 Creando activos iniciales...');
    await this.createAssets();

    console.log('🌱 Creando datos de MarketData...');
    await this.createMarketData();

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
    await this.marketDataRepository.delete({});
    await this.assetRepository.delete({});
    
  }

  // 📊 Crear algunos activos de prueba
  // que son , son : (Pendiente) , Su valor varia, por una api externa. actualizacion diaria 
  // pendiente que activos agregar.
  private async createAssets() {
    const assets = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        asset_type: 'Stock',
        market_price: 150.5,
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        asset_type: 'Stock',
        market_price: 2800.75,
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        asset_type: 'Stock',
        market_price: 900.3,
      },
      {
        symbol: 'BTC',
        name: 'Bitcoin',
        asset_type: 'Crypto',
        market_price: 45000.0,
      },
    ];

    for (const assetData of assets) {
      const asset = new AssetEntity();
      asset.symbol = assetData.symbol;
      asset.name = assetData.name;
      asset.asset_type = assetData.asset_type;
      asset.market_price = assetData.market_price;
      await this.assetRepository.save(asset);
    }
    console.log('📈 Activos creados exitosamente.');
  }

  // (En espera, se puede agregar un campo mas ver excalidraw)

  private async createMarketData() {
    const assets = await this.assetRepository.find();

    for (const asset of assets) {
      const marketData = new MarketDataEntity();
      marketData.asset = asset;
      marketData.price = asset.market_price; // Utilizamos el precio del activo para MarketData
      marketData.timestamp = new Date(); // Timestamp actual
      await this.marketDataRepository.save(marketData);
    }
    console.log('📊 Datos de MarketData creados exitosamente.');
  }

  //  (Pendiente, )
  private async createPortfolioForUser(user: UserEntity) {
    const assets = await this.assetRepository.find();

    for (const asset of assets) {
      const portfolio = new PortfolioEntity();
      portfolio.userId = user.id;
      portfolio.asset = asset;

      // Cantidad de activos (entre 1 y 100)
      portfolio.quantity = parseFloat(
        faker.finance.amount({
          min: 1,
          max: 100,
          dec: 2, // Si no quieres decimales, puedes dejarlo en 0
        }),
      ); // Solo min y max
      if (isNaN(portfolio.quantity)) {
        console.log('Error en la cantidad:', portfolio.quantity);
      }

      // Precio promedio de compra (entre asset.market_price - 50 y asset.market_price + 50)
      const avgBuyPrice = faker.finance.amount({
        min: asset.market_price - 50,
        max: asset.market_price + 50,
        dec: 2, // Limita el número a dos decimales
      });
      portfolio.avg_buy_price = parseFloat(avgBuyPrice);
      if (isNaN(portfolio.avg_buy_price)) {
        console.log('Error en avg_buy_price:', portfolio.avg_buy_price);
      } // Convertimos a float

      // Precio actual del activo
      portfolio.current_price = asset.market_price;

      await this.portfolioRepository.save(portfolio);
    }

    console.log(`🗃️ Portafolio creado para el usuario ${user.name}`);
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

    // Crear Portfolio para el usuario
    await this.createPortfolioForUser(user);

    const transaction = new TransactionEntity();
    transaction.user = user;
    transaction.asset = await this.assetRepository.findOneBy({}); // 100,0 , 10.000 
    transaction.quantity = parseFloat(faker.finance.amount());
    transaction.price = parseFloat(faker.finance.amount());
    transaction.transaction_type = faker.helpers.arrayElement(
      Object.values(TypeTrans),
    );
    transaction.location = faker.location.city();

    await this.transactionRepository.save(transaction);
  }
}

// recomendaciones, paquetes de tres histrumentos en el portafolios del cliente por separado.
