import { Injectable } from '@nestjs/common';
import { SeedUserService } from './seed-user.service';
// import { SeedAssetService } from './seed-assets.service';
// import { SeedMarketDataService } from './seed-market-data.service';
// import { SeedPortfolioService } from './seed-portfolio.service';
// import { SeedTransactionService } from './seed-transaction.service';
import { ClearDatabaseService } from './clear-database.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly clearDatabaseService: ClearDatabaseService,
    private readonly seedUsersService: SeedUserService,
    // private readonly seedMarketDataService: SeedMarketDataService,
    // private readonly seedAccountsService: SeedAccountsService,
    // private readonly seedTransactionsService: SeedTransactionsService,
    // private readonly seedAssetsService: SeedAssetsService,
    // private readonly seedPortfoliosService: SeedPortfoliosService,
  ) {}

  async execute() {
    console.log('🚀 Iniciando el proceso de seed de datos...');
    try {
      // console.log('🧹 Limpiando base de datos...');
      // await this.clearDatabaseService.clearDatabase();

      // console.log('Generando: market-data , insertando archivo')
      // await this.seedMarketDataService.seedData();

      // console.log('👤 Generando usuarios...');
      // await this.seedUsersService.createCompleteUser();

      // console.log('💳 Generando cuentas...');
      // await this.seedAccountsService.generateAccounts();

      // console.log('📈 Generando activos...');
      // await this.seedAssetsService.generateAssets();

      // console.log('📊 Generando portafolios...');
      // await this.seedPortfoliosService.generatePortfolios();

      // console.log('💸 Generando transacciones...');
      // await this.seedTransactionsService.generateTransactions();

      console.log('✅ Seed de datos completado exitosamente.');
    } catch (error) {
      console.error('❌ Error durante el proceso de seed:', error);
    }
  }

  private async ClearDatabaseService() {
    // Aquí podrías agregar lógica para limpiar tablas si fuera necesario
    console.log('🗑️ Limpieza de tablas no implementada todavía.');
  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { UserEntity } from 'src/entitys/user.entity';
// import { AccountEntity } from 'src/entitys/account.entity';
// import { QuestionEntity } from 'src/entitys/question.entity';
// import { TransactionEntity } from 'src/entitys/transactions.entity';
// import { TypeTrans} from 'src/entitys/enum/typeTransaction';
// import { PortfolioEntity } from 'src/entitys/portfolio.entity';
// import { AssetEntity } from 'src/entitys/asset.entity';
// import * as bcrypt from 'bcryptjs';
// import { faker } from '@faker-js/faker';
// import { v4 as uuidv4 } from 'uuid';
// import { MarketDataEntity } from 'src/entitys/marketData.entity';
// import * as fs from 'fs';
// import * as path from 'path';
// import * as csv from 'csv-parser';
// import { MarketDataApiService } from 'src/services/market-data-api.service';
// import { BalanceEntity } from 'src/entitys/balance.entity';

// @Injectable()
// export class SeedService {
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//     @InjectRepository(AccountEntity)
//     private readonly accountRepository: Repository<AccountEntity>,
//     @InjectRepository(QuestionEntity)
//     private readonly questionRepository: Repository<QuestionEntity>,
//     @InjectRepository(TransactionEntity)
//     private readonly transactionRepository: Repository<TransactionEntity>,
//     @InjectRepository(PortfolioEntity)
//     private readonly portfolioRepository: Repository<PortfolioEntity>,
//     @InjectRepository(AssetEntity)
//     private readonly assetRepository: Repository<AssetEntity>,
//     @InjectRepository(MarketDataEntity)
//     private readonly marketDataRepository: Repository<MarketDataEntity>,
//     private readonly marketDataApiService: MarketDataApiService,
//     @InjectRepository(BalanceEntity)
//     private readonly balanceRepository: Repository<BalanceEntity>,
//   ) {}

//   async runSeed() {
//     console.log('🚨 Limpiando la base de datos...');
//     await this.clearDatabase();

//     console.log('🌱 Creando activos iniciales...');
//     await this.createAssets();

//     console.log('🌱 Creando datos de MarketData...');
//     await this.createMarketData();

//     console.log('🌱 Iniciando la creación de datos de prueba...');
//     for (let i = 0; i < 2; i++) {
//       await this.createCompleteUser();
//     }
//     console.log('✅ Datos de prueba generados correctamente.');
//   }

//   // 🧹 Limpia TODAS las tablas de la base de datos antes de iniciar
//   private async clearDatabase() {
//     await this.transactionRepository.delete({});
//     await this.portfolioRepository.delete({});
//     await this.questionRepository.delete({});
//     await this.accountRepository.delete({});
//     await this.userRepository.delete({});
//     await this.marketDataRepository.delete({});
//     await this.assetRepository.delete({});
//     await this.balanceRepository.delete({});
//   }

//   // 📊 Crear algunos activos de prueba
//   // que son , son : (Pendiente) , Su valor varia, por una api externa. actualizacion diaria
//   // pendiente que activos agregar.
//   private async createAssets() {
//     const assets: AssetEntity[] = [];

//     const csvFilePath = path.join(__dirname, 'data', 'csv', 'assets.csv');

//     // Verificar que el archivo existe
//     if (!fs.existsSync(csvFilePath)) {
//       console.error('El archivo CSV no se encuentra en la ruta:', csvFilePath);
//       return;
//     }

//     // Leemos el archivo CSV de forma asíncrona con Promises
//     await new Promise<void>((resolve, reject) => {
//       fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (row) => {
//           const asset = new AssetEntity();
//           asset.symbol = row.symbol;
//           asset.name = row.name;
//           asset.asset_type = row.asset_type;
//           asset.market_price = parseFloat(row.market_price);

//           // Validar que los valores sean correctos
//           if (!asset.symbol || !asset.name || isNaN(asset.market_price)) {
//             console.log('Datos inválidos en la fila del CSV:', row);
//           } else {
//             assets.push(asset);
//           }
//         })
//         .on('end', () => resolve()) // Cuando termine de leer
//         .on('error', reject); // En caso de error al leer el archivo
//     });

//     // Guardar los activos en la base de datos
//     if (assets.length > 0) {
//       await Promise.all(
//         assets.map((asset) => this.assetRepository.save(asset)),
//       );
//       console.log('📈 Activos creados exitosamente desde el CSV.');
//     } else {
//       console.log('No se encontraron activos válidos en el archivo CSV.');
//     }
//   }

//   // (En espera, se puede agregar un campo mas ver excalidraw)

//   private async createMarketData() {
//     const assets = await this.assetRepository.find();

//     for (const asset of assets) {
//       // Intentamos obtener el precio de la API externa
//       const priceFromAPI = await this.marketDataApiService.getAssetPrice(
//         asset.symbol,
//       );
//       const marketData = new MarketDataEntity();
//       marketData.asset = asset;
//       marketData.price = priceFromAPI || asset.market_price; // Usamos el precio del activo si la API falla
//       marketData.timestamp = new Date(); // Timestamp actual
//       await this.marketDataRepository.save(marketData);
//     }
//     console.log('📊 Datos de MarketData creados exitosamente.');
//   }

//   //  (Pendiente, )
//   private async createPortfolioForUser(user: UserEntity) {
//     const assets = await this.assetRepository.find();
//     const selectedAssets = faker.helpers.shuffle(assets).slice(0, 3); //

//     for (const asset of selectedAssets) {
//       const portfolio = new PortfolioEntity();
//       portfolio.userId = user.id;
//       portfolio.asset = asset;

//       // Cantidad de activos (entre 1 y 100)
//       portfolio.quantity = parseFloat(
//         faker.finance.amount({
//           min: 1,
//           max: 100,
//           dec: 2, // Si no quieres decimales, puedes dejarlo en 0
//         }),
//       ); // Solo min y max
//       if (isNaN(portfolio.quantity)) {
//         console.log('Error en la cantidad:', portfolio.quantity);
//       }

//       // Precio promedio de compra (entre asset.market_price - 50 y asset.market_price + 50)
//       const avgBuyPrice = faker.finance.amount({
//         min: asset.market_price - 50,
//         max: asset.market_price + 50,
//         dec: 2, // Limita el número a dos decimales
//       });
//       portfolio.avg_buy_price = parseFloat(avgBuyPrice);
//       if (isNaN(portfolio.avg_buy_price)) {
//         console.log('Error en avg_buy_price:', portfolio.avg_buy_price);
//       } // Convertimos a float

//       // Precio actual del activo
//       portfolio.current_price = asset.market_price;

//       await this.portfolioRepository.save(portfolio);
//     }

//     console.log(`🗃️ Portafolio creado para el usuario ${user.name}`);
//   }

//   // 🧑‍💼 Crea un usuario con todas sus propiedades
//   private async createCompleteUser() {
//     // Crear un usuario
//     const user = new UserEntity();
//     user.name = faker.name.firstName() + ' ' + faker.name.lastName();
//     user.email = faker.internet.email();
//     user.passwordhash = await bcrypt.hash('password123', 10);
//     user.image = faker.image.avatar();
//     const savedUser = await this.userRepository.save(user);
//     console.log(`👤 Usuario creado: ${savedUser.name}`);

//     // Crear cuenta asociada
//     const account = new AccountEntity();
//     account.userId = user.id;
//     account.type = 'credentials'; // Tipo de cuenta "credentials"
//     account.provider = 'Local'; // Esto indica que es una cuenta de tipo local (credenciales tradicionales)
//     account.providerAccountId = uuidv4(); // Genera un UUID utilizando 'uuidv4'
//     account.refresh_token = null; // No se usará en este caso
//     account.access_token = null; // No se usará en este caso
//     account.expires_at = null; // No se usará en este caso
//     account.token_type = null; // No se usará en este caso
//     account.scope = null; // No se usará en este caso
//     account.id_token = null; // No se usará en este caso
//     account.session_state = null; // No se usará en este caso
//     account.oauth_token_secret = null; // No se usará en este caso
//     account.oauth_token = null; // No se usará en este caso

//     await this.accountRepository.save(account);

//     // Crear el balance inicial para el usuario (cero por defecto)
//     const balance = new BalanceEntity();
//     balance.user = savedUser;
//     balance.balance = 0.0; // Balance inicial
//     await this.balanceRepository.save(balance);
//     console.log(`💰 Balance creado para el usuario: ${savedUser.name}`);

//     const question = new QuestionEntity();
//     question.userId = user.id;
//     question.p_q1 = faker.number.int({ min: 1, max: 10 });
//     question.p_q2 = faker.number.int({ min: 1, max: 10 });
//     question.p_q3 = faker.number.int({ min: 1, max: 10 });
//     question.p_q4 = faker.number.int({ min: 1, max: 10 });
//     question.p_q5 = faker.number.int({ min: 1, max: 10 });
//     question.p_q6 = faker.number.int({ min: 1, max: 10 });
//     question.p_q7 = faker.number.int({ min: 1, max: 10 });

//     await this.questionRepository.save(question);

//     // Crear Portfolio para el usuario
//     await this.createPortfolioForUser(user);

//     // Crear una transacción ficticia
// // Crear una transacción ficticia (ejemplo)
//   const transaction = new TransactionEntity();
//   const randomAsset = faker.helpers.arrayElement(await this.assetRepository.find());
//   transaction.user = user;
//   transaction.asset = randomAsset;
//   transaction.quantity = parseFloat(faker.finance.amount());
//   transaction.price = randomAsset.market_price;
//   transaction.transaction_type = faker.helpers.arrayElement(Object.values(TypeTrans));
//   transaction.location = faker.location.city();

//   await this.transactionRepository.save(transaction);
//   console.log(`💳 Transacción creada para el usuario ${user.name} con el activo ${randomAsset.symbol}`);

//   // Actualizar el balance según el tipo de transacción (Ejemplo de depósito o retiro)
//   await this.updateBalanceAfterTransaction(user, transaction);
// }

// // 🏦 Actualiza el balance después de una transacción
// private async updateBalanceAfterTransaction(user: UserEntity, transaction: TransactionEntity) {
//   const balance = await this.balanceRepository.findOne({
//     where: { user: { id: user.id } }, // Relación con la entidad 'UserEntity'
//   });

//   if (!balance) {
//     console.log(`Error: No se encontró balance para el usuario ${user.name}`);
//     return;
//   }

//   // Lógica de actualización de balance según el tipo de transacción
//   if (transaction.transaction_type === TypeTrans.ACCOUNT_FUNDING) {
//     balance.balance += transaction.quantity * transaction.price; // Aumenta el balance en base al valor de la transacción
//   } else if (transaction.transaction_type === TypeTrans.WITHDRAWAL) {
//     balance.balance -= transaction.quantity * transaction.price; // Disminuye el balance en base al valor de la transacción
//   }

//   // Guardar el balance actualizado
//   await this.balanceRepository.save(balance);
//   console.log(`🔄 Balance actualizado para el usuario ${user.name}: ${balance.balance}`);
// }
// }


// recomendaciones, paquetes de tres histrumentos en el portafolios del cliente por separado.
