import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import * as path from 'path';
import { MarketDataEntity } from '../entities/marketData.entity';
import { AssetEntity } from '../entities/asset.entity';
import { ConfigEnvs } from 'src/config/envs';

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
          await this.processData(results);
        });
    } catch (error) {
      console.error('Error al leer el archivo CSV:', error);
    }
  }

  private async processData(data: MarketDataCsvRow[]) {
    // Obtener todos los asset_ids únicos del CSV
    const assetIds = [...new Set(data.map((row) => row.asset_id))];

    // Precargar los activos existentes
    const existingAssets = await this.assetRepository.find({
      where: { id: In(assetIds) },
    });
    const existingAssetIds = new Set(existingAssets.map((asset) => asset.id));

    // Crear nuevos activos si no existen
    const newAssets = assetIds
      .filter((id) => !existingAssetIds.has(id))
      .map((id) => {
        const asset = new AssetEntity();
        asset.id = id;
        asset.name = `Asset ${id}`; // Puedes ajustar el nombre según sea necesario
        asset.symbol = `Asset ${id}`;
        return asset;
      });

    if (newAssets.length > 0) {
      await this.assetRepository.save(newAssets);
      console.log(`Creados ${newAssets.length} nuevos activos.`);
    }

    // Precargar datos de mercado existentes
    const marketDataTimestamps = data.map((row) => ({
      asset_id: row.asset_id,
      timestamp: this.parseDate(row.fecha),
    }));

    const existingMarketData = await this.marketDataRepository.find({
      where: marketDataTimestamps.map(({ asset_id, timestamp }) => ({
        asset: { id: asset_id },
        timestamp,
      })),
    });

    const existingMarketDataMap = new Map(
      existingMarketData.map((md) => [
        `${md.asset.id}-${md.timestamp.toISOString()}`, // La clave
        md, // El valor asociado a la clave (el objeto MarketDataEntity)
      ]),
    );

    // Crear nuevos datos de mercado
    const newMarketData = data
      .filter(
        (row) =>
          !existingMarketDataMap.has(
            `${row.asset_id}-${this.parseDate(row.fecha).toISOString()}`,
          ),
      )
      .map((row) => {
        const marketData = new MarketDataEntity();
        marketData.asset =
          existingAssets.find((a) => a.id === row.asset_id) ||
          newAssets.find((a) => a.id === row.asset_id);
        marketData.price = parseFloat(row.cierre);
        marketData.timestamp = this.parseDate(row.fecha);
        return marketData;
      });

    if (newMarketData.length > 0) {
      await this.marketDataRepository.save(newMarketData);
      console.log(`Guardados ${newMarketData.length} nuevos datos de mercado.`);
    }

    console.log('Inyección de datos completada.');
  }

  private parseDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('-');
    return new Date(`${20}${year}-${month}-${day}`);
  }
}
