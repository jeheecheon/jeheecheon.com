import type { Maybe } from "@packages/common/types/misc";
import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import {
  injectCoinChartData,
  type InjectCoinChartDataArgs,
} from "~/injectors/injectCoinChartData";
import type {
  CoinChartDataWithRefreshedAt,
  RawCoinChartData,
} from "~/types/coin";

export const useCoinChartData = (argsFn: () => InjectCoinChartDataArgs) => {
  const { coinId, days, precision = 2 } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery<
    Maybe<RawCoinChartData>,
    Error,
    CoinChartDataWithRefreshedAt
  >(() => ({
    queryKey: ["coin-price-graph", `${coinId}-${days}-${precision}`],
    queryFn: () =>
      injectCoinChartData({
        coinId,
        days,
        precision,
      }),
    select: (data) => ({
      marketCaps:
        data?.market_caps.map(([timestamp, marketCap]) => ({
          timestamp: new Date(timestamp),
          marketCap,
        })) ?? [],
      prices:
        data?.prices.map(([timestamp, price]) => ({
          timestamp: new Date(timestamp),
          price,
        })) ?? [],
      totalVolumes:
        data?.total_volumes.map(([timestamp, totalVolume]) => ({
          timestamp: new Date(timestamp),
          totalVolume,
        })) ?? [],
      refreshedAt: new Date(),
    }),
    enabled: isClient(),
  }));

  return query;
};
