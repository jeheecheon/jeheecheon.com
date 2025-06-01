import type { DateLike, Nullable } from "@packages/utils/types";
import dayjs from "dayjs";
import { capitalize } from "lodash-es";
import { SolidApexCharts } from "solid-apexcharts";
import { noSymbol } from "solid-heroicons/solid";
import {
  createEffect,
  createSignal,
  Show,
  VoidComponent,
  type JSX,
} from "solid-js";
import { Spinner, SpinnerType } from "solid-spinner";
import toast from "solid-toast";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import PresenceTransition from "~/components/PresenceTransition";
import { useCoinPriceHistory } from "~/hooks/useCoinPrices";
import { cn } from "~/utils/class-name";

const CoinPriceGraph: VoidComponent<{
  class?: string;
  fallback?: JSX.Element;
  coinId: string;
  days: number;
}> = (props) => {
  const [refreshedAt, setRefreshedAt] = createSignal<Nullable<DateLike>>(null);

  const historyQuery = useCoinPriceHistory(() => ({
    coinId: props.coinId,
    days: props.days,
  }));

  const borderColor = "#383838";
  const lineColor = "oklch(83.7% 0.128 66.29)";
  const titleColor = "oklch(83.7% 0.128 66.29)";
  const labelColor = "#383838";

  createEffect(() => {
    if (!historyQuery.isSuccess) {
      return;
    }

    setRefreshedAt(dayjs());
  });

  return (
    <div class={cn("relative", props.class)}>
      <SolidApexCharts
        width="100%"
        height="100%"
        type="line"
        options={{
          title: {
            text: historyQuery.isSuccess
              ? `${capitalize(props.coinId)} ${props.days}D history`
              : "",
            align: "left",
            style: {
              color: titleColor,
            },
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
              text: historyQuery.isSuccess ? "Price (USD)" : "",
              style: {
                color: titleColor,
              },
            },
            labels: {
              style: {
                colors: labelColor,
              },
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
              text: historyQuery.isSuccess ? "Date" : "",
              style: {
                color: titleColor,
              },
            },
            type: "datetime",
            labels: {
              style: {
                colors: labelColor,
              },
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
            colors: [lineColor],
          },
        }}
        series={[
          {
            name: `${capitalize(props.coinId)} Price (USD)`,
            data:
              historyQuery.data?.map((item) => [
                item.timestamp.getTime(),
                item.price,
              ]) || [],
          },
        ]}
      />

      <PresenceTransition
        class="absolute inset-0 flex cursor-not-allowed items-center justify-center gap-x-1 rounded-lg select-none dark:text-orange-800"
        visible={historyQuery.isError}
        transitionKey="coin-price-graph"
        option="fadeInOut"
      >
        <Icon class="size-4" path={noSymbol} />
        <p class="text-sm">No data available</p>
      </PresenceTransition>

      <Show when={historyQuery.isLoading}>
        <Spinner
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          type={SpinnerType.puff}
          color={lineColor}
        />
      </Show>

      <div class="absolute top-0 right-3 flex items-end gap-x-4">
        <Show when={refreshedAt()}>
          <span class="text-sm text-orange-300">
            Last updated {dayjs(refreshedAt()).format("hh:mm:ss A")}
          </span>
        </Show>

        <Button
          size="sm"
          loading={historyQuery.isLoading}
          onClick={handleReload}
        >
          Reload
        </Button>
      </div>
    </div>
  );

  function handleReload() {
    toast.promise(
      historyQuery.refetch().then(() => {
        setRefreshedAt(dayjs());
      }),
      {
        loading: "Reloading...",
        success: "History updated",
        error: "Failed to update history",
      },
    );
  }
};

export default CoinPriceGraph;
