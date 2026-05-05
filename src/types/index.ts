// src/types/index.ts

export interface CoinGeckoResponse {
  bitcoin?: {
    usd?: number;
  };
  status?: {
    error_code: number;
    error_message: string;
  };
}

export interface PriceRecord {
  id: number;
  timestamp: Date;
  price: string;
}
