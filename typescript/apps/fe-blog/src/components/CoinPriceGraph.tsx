import { clientOnly } from "@solidjs/start";
import dayjs from "dayjs";
import { capitalize } from "lodash-es";
import { noSymbol } from "solid-heroicons/solid";
import { VoidComponent } from "solid-js";
import Icon from "~/components/Icon";
import PresenceTransition from "~/components/PresenceTransition";
import Skeleton from "~/components/Skeleton";
import { useCoinPriceHistory } from "~/hooks/useCoinPrices";
import { cn } from "~/utils/class-name";

const ClientOnlyApexChart = clientOnly(() =>
  import("solid-apexcharts").then((module) => ({
    default: module.SolidApexCharts,
  })),
);

const CoinPriceGraph: VoidComponent<{
  class?: string;
  coinId: string;
  days: number;
}> = (props) => {
  const { data: history, isSuccess } = useCoinPriceHistory(() => ({
    coinId: props.coinId,
    days: props.days,
  }));

  const borderColor = "#383838";

  return (
    <div class={cn("relative", props.class)}>
      <ClientOnlyApexChart
        fallback={<Skeleton class="size-full rounded-md" />}
        visible={isSuccess}
        width="100%"
        height="100%"
        type="line"
        options={{
          title: {
            text: `${capitalize(props.coinId)} ${props.days}d history`,
            align: "right",
          },
          chart: {
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          grid: {
            show: false,
          },
          tooltip: {
            enabled: true,
            theme: "dark",
          },
          yaxis: {
            title: {
              text: "Price (USD)",
            },
            tooltip: {
              enabled: true,
            },
            axisTicks: {
              show: true,
              color: borderColor,
            },
            axisBorder: {
              show: true,
              color: borderColor,
            },
          },
          xaxis: {
            title: {
              text: "Date",
            },
            type: "datetime",
            labels: {
              show: true,
            },
            tooltip: {
              enabled: true,
              formatter: (value: string) =>
                dayjs(value).format("MMM D, hh:mm A"),
            },
            axisTicks: {
              show: true,
              color: borderColor,
            },
            axisBorder: {
              color: borderColor,
            },
          },
          stroke: {
            curve: "smooth",
            width: 1,
            colors: ["#FFA500"],
          },
        }}
        series={[
          {
            name: "ETH Price (USD)",
            data:
              history?.map((item) => [item.timestamp.getTime(), item.price]) ||
              [],
          },
        ]}
      />

      <PresenceTransition
        class="absolute inset-0 flex cursor-not-allowed items-center justify-center gap-x-1 rounded-lg bg-zinc-950/10 text-orange-800 select-none"
        visible={history?.length === 0}
        transitionKey="coin-price-graph"
        option="fadeInOut"
      >
        <Icon class="size-4" path={noSymbol} />
        <p class="text-sm">No data available</p>
      </PresenceTransition>
    </div>
  );
};

export default CoinPriceGraph;
