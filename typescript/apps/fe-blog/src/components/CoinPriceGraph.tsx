import type { DateLike, Nullable } from "@packages/common/types/misc";
import { clientOnly } from "@solidjs/start";
import dayjs from "dayjs";
import { capitalize } from "lodash-es";
import { noSymbol } from "solid-heroicons/solid";
import { createEffect, createSignal, Show, type VoidComponent } from "solid-js";
import { Spinner, SpinnerType } from "solid-spinner";
import toast from "solid-toast";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import PresenceTransition from "~/components/PresenceTransition";
import Skeleton from "~/components/Skeleton";
import { useCoinPriceHistory } from "~/hooks/useCoinPrices";
import { cn } from "~/utils/class-name";

const ApexCharts = clientOnly(() =>
  import("solid-apexcharts").then((module) => ({
    default: module.SolidApexCharts,
  })),
);

const CoinPriceGraph: VoidComponent<{
  class?: string;
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
    <div class={cn("relative h-96", props.class)}>
      <div class="absolute top-0 right-3 z-10 flex items-end gap-x-4">
        <Show when={historyQuery.isSuccess && refreshedAt()}>
          <span class="text-sm text-orange-300 not-md:hidden">
            Last updated {dayjs(refreshedAt()).format("hh:mm:ss A")}
          </span>
        </Show>

        <Show when={historyQuery.isSuccess}>
          <Button
            size="sm"
            loading={historyQuery.isLoading}
            onClick={handleReload}
          >
            Reload
          </Button>
        </Show>
      </div>

      <ApexCharts
        fallback={<Skeleton class="size-full rounded-md" />}
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
            data: historyQuery.isSuccess
              ? historyQuery.data?.map((item) => [
                  item.timestamp.getTime(),
                  item.price,
                ])
              : [],
          },
        ]}
      />

      <PresenceTransition
        class="absolute-center cursor-not-allowed rounded-lg dark:text-orange-800"
        visible={historyQuery.isError}
        transitionKey="coin-price-graph"
        option="fadeInOut"
      >
        <Icon class="-mt-0.5 inline-block size-4" path={noSymbol} />
        <p class="ml-1 inline-block text-sm">No data available</p>
      </PresenceTransition>

      <Show when={historyQuery.isLoading}>
        <Spinner
          class="absolute-center"
          type={SpinnerType.puff}
          color={lineColor}
        />
      </Show>
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
