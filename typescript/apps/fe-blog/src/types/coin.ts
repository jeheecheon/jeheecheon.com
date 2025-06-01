export type ChartData = {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
};

export type PriceHistory = {
  timestamp: Date;
  price: number;
}[];
