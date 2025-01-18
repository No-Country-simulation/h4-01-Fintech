import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser'; // Usamos 'csv-parser' directamente
import { MarketDataEntity } from '../entitys/marketData.entity';
import { AssetEntity } from '../entitys/asset.entity';
import { ConfigEnvs } from 'src/config/envs';
import * as path from 'path';

interface MarketDataCsvRow {
  asset_id: string;
  fecha: string;
  cierre: string;
  market_data_id: string;
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
      // Creamos un flujo de lectura para el archivo CSV
      const fileStream = fs.createReadStream(filePath);

      // Array para almacenar los resultados
      const results: MarketDataCsvRow[] = [];

      // Usamos 'csv-parser' para leer y parsear el archivo CSV
      fileStream
        .pipe(csv())
        .on('data', (row) => {
          results.push(row); // Almacenamos cada fila en el array
        })
        .on('end', async () => {
          await this.insertMarketData(results);
        });
    } catch (error) {
      console.error('Error al leer el archivo CSV:', error);
    }
  }

  private async insertMarketData(data: MarketDataCsvRow[]) {
    for (const row of data) {
      // const asset = await this.assetRepository.findOne({
      //   where: { id: row.asset_id },
      // });

      //if (asset) {
        const marketData = new MarketDataEntity();
        // marketData.asset = asset;
        marketData.price = parseFloat(row.cierre);
        marketData.timestamp = this.parseDate(row.fecha);

        await this.marketDataRepository.save(marketData);
      } else {
        console.log(`Activo no encontrado para asset_id: ${row.asset_id}`);
      }
    }

    console.log('Datos de mercado inyectados exitosamente.');
  }

  private parseDate(dateStr: string): Date {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    const [day, month, year] = dateStr.split('-');
    return new Date(`${20}${year}-${month}-${day}`);
  }
}
