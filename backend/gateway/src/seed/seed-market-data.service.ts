// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository, In } from 'typeorm';
// import * as fs from 'fs';
// import * as csv from 'csv-parser';
// import * as path from 'path';
// import { MarketDataEntity } from '../entities/marketData.entity';
// import { AssetEntity } from '../entities/asset.entity';
// import { ConfigEnvs } from 'src/config/envs';

// interface MarketDataCsvRow {
//   asset_id: string;
//   fecha: string;
//   cierre: string;
//   market_data_id: number;
// }

// @Injectable()
// export class SeedMarketDataService {
//   constructor(
//     @InjectRepository(MarketDataEntity)
//     private readonly marketDataRepository: Repository<MarketDataEntity>,

//     @InjectRepository(AssetEntity)
//     private readonly assetRepository: Repository<AssetEntity>,
//   ) {}

//   private readonly batchSize = 10; // Tamaño del lote para inyección

//   async seedData() {
//     const filePath =
//       ConfigEnvs.NODE_ENV === 'production'
//         ? path.resolve(__dirname, '../../dist/seed/data.csv')
//         : path.resolve(__dirname, './data.csv');

//     console.log('Archivo:', filePath);

//     try {
//       const fileStream = fs.createReadStream(filePath);
//       const results: MarketDataCsvRow[] = [];

//       fileStream
//         .pipe(csv())
//         .on('data', (row) => {
//           results.push(row);
//         })
//         .on('end', async () => {
//           console.log(`Archivo procesado. Total de filas: ${results.length}`);
//           await this.processData(results);
//         });
//     } catch (error) {
//       console.error('Error al leer el archivo CSV:', error);
//     }
//   }

//   private async processData(data: MarketDataCsvRow[]) {
//     // Buscar activos existentes
//     const assetIds = [...new Set(data.map((row) => row.asset_id))];
//     const existingAssets = await this.assetRepository.find({
//       where: { id: In(assetIds) },
//     });

//     const assetMap = new Map(existingAssets.map((asset) => [asset.id, asset]));

//     // Filtrar datos de mercado existentes
//     const timestamps = data.map((row) => this.parseDate(row.fecha));
//     const existingMarketData = await this.marketDataRepository.find({
//       where: {
//         asset: { id: In(assetIds) },
//         timestamp: In(timestamps),
//       },
//     });

//     const existingMarketDataMap = new Map(
//       existingMarketData.map((md) => [
//         `${md.asset.id}-${md.timestamp.toISOString()}`,
//         md,
//       ]),
//     );

//     // Crear nuevos datos de mercado
//     const newMarketData = data
//       .filter(
//         (row) =>
//           !existingMarketDataMap.has(
//             `${row.asset_id}-${this.parseDate(row.fecha).toISOString()}`,
//           ),
//       )
//       .map((row) => {
//         const asset = assetMap.get(row.asset_id);
//         if (!asset) {
//           console.warn(`Activo no encontrado para asset_id=${row.asset_id}`);
//           return null;
//         }

//         const marketData = new MarketDataEntity();
//         marketData.asset = asset;
//         marketData.price = parseFloat(row.cierre);
//         marketData.timestamp = this.parseDate(row.fecha);
//         marketData.market_data_id = row.market_data_id;
//         return marketData;
//       })
//       .filter(Boolean) as MarketDataEntity[];

//     if (newMarketData.length > 0) {
//       await this.batchInsert(newMarketData, this.batchSize);
//     }

//     console.log('Inyección de datos completada.');
//   }

//   private async batchInsert(
//     data: MarketDataEntity[],
//     batchSize: number,
//     delayMs = 1000,
//   ) {
//     const totalBatches = Math.ceil(data.length / batchSize);

//     for (let i = 0; i < data.length; i += batchSize) {
//       const batch = data.slice(i, i + batchSize);
//       await this.marketDataRepository.save(batch);

//       console.log(
//         `Lote ${Math.ceil(i / batchSize) + 1} de ${totalBatches} guardado. (${i + 1} - ${
//           i + batch.length
//         } de ${data.length})`,
//       );

//       if (delayMs > 0) {
//         await this.sleep(delayMs);
//       }
//     }

//     console.log(`Guardados ${data.length} nuevos datos de mercado.`);
//   }

//   private sleep(ms: number) {
//     return new Promise((resolve) => setTimeout(resolve, ms));
//   }

//   private parseDate(dateStr: string): Date {
//     const [day, month, year] = dateStr.split('-');
//     return new Date(`${20}${year}-${month}-${day}`);
//   }
// }
