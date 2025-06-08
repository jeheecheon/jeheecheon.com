import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import {
  injectCoinChartData,
  type InjectCoinChartDataArgs,
} from "~/injectors/injectCoinChartData";

export const useCoinChartData = (argsFn: () => InjectCoinChartDataArgs) => {
  const { coinId, days, precision = 2 } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery(() => ({
    queryKey: ["coin-price-graph", `${coinId}-${days}-${precision}`],
    queryFn: () =>
      injectCoinChartData({
        coinId,
        days,
        precision,
      }),
    enabled: isClient(),
  }));

  return query;
};
