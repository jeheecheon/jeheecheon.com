export type RawCoinCharItem = [number, number];

export type RawCoinChartData = {
  prices: RawCoinCharItem[];
  market_caps: RawCoinCharItem[];
  total_volumes: RawCoinCharItem[];
};

export type CoinChartDataWithRefreshedAt = {
  prices: {
    timestamp: Date;
    price: number;
  }[];
  marketCaps: {
    timestamp: Date;
    marketCap: number;
  }[];
  totalVolumes: {
    timestamp: Date;
    totalVolume: number;
  }[];
  refreshedAt: Date;
};
