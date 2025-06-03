import { z } from "zod";

export const rawCoinChartItemSchema = z.tuple([
  z.number().transform((val) => new Date(val)),
  z.number(),
]);
export type RawCoinChartItem = z.infer<typeof rawCoinChartItemSchema>;

export const rawCoinChartDataSchema = z.object({
  prices: z.array(rawCoinChartItemSchema),
  market_caps: z.array(rawCoinChartItemSchema),
  total_volumes: z.array(rawCoinChartItemSchema),
});
export type RawCoinChartData = z.infer<typeof rawCoinChartDataSchema>;

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
  updatedAt: Date;
};
