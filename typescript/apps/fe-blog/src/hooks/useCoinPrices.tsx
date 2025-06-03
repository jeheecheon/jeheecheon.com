import type { Maybe } from "@packages/common/types/misc";
import { useQuery } from "@tanstack/solid-query";
import { coingeckoClient } from "~/axios/coingecko-client";
import type { ChartData, PriceHistory } from "~/types/coin";

export const useCoinPriceHistory = (
  argsFn: () => { coinId: string; days: number; precision?: number },
) => {
  const { coinId, days, precision = 2 } = argsFn();

  const query = useQuery<Maybe<ChartData>, Error, PriceHistory>(() => ({
    queryKey: ["coin-price-graph", `${coinId}-${days}-${precision}`],
    queryFn: () =>
      coingeckoClient
        .get<ChartData>(`/coins/${coinId}/market_chart`, {
          params: {
            vs_currency: "usd",
            days,
            precision,
          },
        })
        .then((res) => res.data)
        .catch((error) => {
          console.error(error);
          return null;
        }),
    select: (data) =>
      data?.prices.map(([timestamp, price]) => ({
        timestamp: new Date(timestamp),
        price,
      })) ?? [],
  }));

  return query;
};
