import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { MarketDataEntity } from '../entities/marketData.entity';
import { AssetEntity } from '../entities/asset.entity';
import { ConfigEnvs } from 'src/config/envs';
import * as path from 'path';

interface MarketDataCsvRow {
  asset_id: string;
  fecha: string;
  cierre: string;
}

@Injectable()
export class SeedMarketDataService {
  constructor(
    @InjectRepository(MarketDataEntity)
    private readonly marketDataRepository: Repository<MarketDataEntity>,

    @InjectRepository(AssetEntity)
    private readonly assetRepository: Repository<AssetEntity>,
  ) {}

  async seedData() {
    const filePath =
      ConfigEnvs.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../../dist/seed/data.csv') // Ruta para producción
        : path.resolve(__dirname, './data.csv'); // Ruta para desarrollo

    console.log('Archivo:', filePath);

    try {
      const fileStream = fs.createReadStream(filePath);
      const results: MarketDataCsvRow[] = [];

      fileStream
        .pipe(csv())
        .on('data', (row) => {
          results.push(row);
        })
        .on('end', async () => {
          console.log(`Archivo procesado. Total de filas: ${results.length}`);
          const batchSize = 100; // Tamaño del lote
          const delayBetweenBatches = 2000; // Retraso entre lotes
          await this.insertMarketDataInBatches(
            results,
            batchSize,
            delayBetweenBatches,
          );
        });
    } catch (error) {
      console.error('Error al leer el archivo CSV:', error);
    }
  }

  private async insertMarketDataInBatches(
    data: MarketDataCsvRow[],
    batchSize: number,
    delay: number,
  ) {
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      console.log(
        `Procesando lote ${i / batchSize + 1} de ${Math.ceil(data.length / batchSize)}...`,
      );

      for (const row of batch) {
        let asset = await this.assetRepository.findOne({
          where: { id: row.asset_id },
        });

        if (!asset) {
          // Crear un nuevo activo si no existe
          asset = new AssetEntity();
          asset.id = row.asset_id;
          asset.name = `Asset ${row.asset_id}`; // Puedes ajustar esto según sea necesario
          await this.assetRepository.save(asset);
          console.log(`Activo creado: ${asset.id}`);
        }

        // Verificar si ya existe el dato de mercado
        const existingMarketData = await this.marketDataRepository.findOne({
          where: { asset: asset, timestamp: this.parseDate(row.fecha) },
        });

        if (!existingMarketData) {
          // Crear y guardar el nuevo dato de mercado
          const marketData = new MarketDataEntity();
          marketData.asset = asset;
          marketData.price = parseFloat(row.cierre);
          marketData.timestamp = this.parseDate(row.fecha);
          await this.marketDataRepository.save(marketData);
          console.log(`Dato de mercado guardado para asset_id: ${asset.id}`);
        } else {
          console.log(
            `Dato de mercado ya existe para asset_id: ${asset.id}, fecha: ${row.fecha}`,
          );
        }
      }

      if (i + batchSize < data.length) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    console.log('Inyección de datos completada.');
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${20}${year}-${month}-${day}`);
  }
}
