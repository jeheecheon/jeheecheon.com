import { coingeckoClient } from "~/axios/coingecko-client";
import type { RawCoinChartData } from "~/types/coin";

export type InjectCoinChartDataArgs = {
  coinId: string;
  days: number;
  precision?: number;
};

export const injectCoinChartData = async (args: InjectCoinChartDataArgs) => {
  const data = await coingeckoClient
    .get<RawCoinChartData>(`/coins/${args.coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: args.days,
        precision: args.precision ?? 2,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return data;
};
