// src/services/market-data-api.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MarketDataApiService {
  // Consumir la API externa que devuelve el precio del activo
  async getAssetPrice(symbol: string): Promise<number | null> {
    try {
      const response = await axios.get(
        `https://api.example.com/price?symbol=${symbol}`,
      );
      if (response.data && response.data.price) {
        return response.data.price;
      }
      return null;
    } catch (error) {
      console.error(`Error al obtener el precio para ${symbol}:`, error);
      return null;
    }
  }
}
