import Button from "@packages/ui/components/Button";
import Icon from "@packages/ui/components/Icon";
import PresenceTransition from "@packages/ui/components/PresenceTransition";
import Skeleton from "@packages/ui/components/Skeleton";
import Spinner from "@packages/ui/components/Spinner";
import { cn } from "@packages/ui/utils/class-name";
import { clientOnly } from "@solidjs/start";
import dayjs from "dayjs";
import { noSymbol } from "solid-heroicons/solid";
import { type VoidComponent } from "solid-js";
import toast from "solid-toast";
import { useCoinChartData } from "~/hooks/useCoinChartData";

const ApexCharts = clientOnly(() =>
  import("solid-apexcharts").then((module) => ({
    default: module.SolidApexCharts,
  })),
);

const CoinPriceGraph: VoidComponent<{
  class?: string;
  coinId: string;
  displayName: string;
  days: number;
}> = (props) => {
  const historyQuery = useCoinChartData(() => ({
    coinId: props.coinId,
    days: props.days,
  }));

  const borderColor = "#383838";
  const lineColor = "oklch(83.7% 0.128 66.29)";
  const titleColor = "oklch(83.7% 0.128 66.29)";
  const labelColor = "#383838";

  return (
    <div class={cn("relative h-96", props.class)}>
      <div class="absolute right-3 top-0 z-10 flex items-end gap-x-4">
        <PresenceTransition
          as="span"
          class="not-md:hidden text-sm text-orange-300"
          transitionKey={`last-updated-label-${historyQuery.isSuccess}`}
          visible={historyQuery.isSuccess}
          option="fadeInOut"
        >
          Last updated {dayjs(historyQuery.dataUpdatedAt).format("hh:mm:ss A")}
        </PresenceTransition>

        <PresenceTransition
          transitionKey={`reload-button-${historyQuery.isSuccess}`}
          visible={historyQuery.isSuccess}
          option="fadeInOut"
        >
          <Button
            theme="primary"
            size="sm"
            loading={historyQuery.isLoading}
            onClick={handleReload}
          >
            Reload
          </Button>
        </PresenceTransition>
      </div>

      <ApexCharts
        fallback={<Skeleton class="size-full rounded-md" />}
        width="100%"
        height="100%"
        type="line"
        options={{
          title: {
            text: historyQuery.isSuccess
              ? `${props.displayName} ${props.days}D history`
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
            name: `${props.displayName} Price (USD)`,
            data: historyQuery.isSuccess
              ? (historyQuery.data?.prices.map((item) => [
                  item.timestamp.getTime(),
                  item.price,
                ]) ?? [])
              : [],
          },
        ]}
      />

      <PresenceTransition
        class="absolute-center cursor-not-allowed rounded-lg dark:text-orange-800"
        visible={historyQuery.isError}
        transitionKey={`coin-price-graph-error-${historyQuery.isError}`}
        option="fadeInOut"
      >
        <Icon class="-mt-0.5 inline-block size-4" path={noSymbol} />
        <p class="ml-1 inline-block text-sm">No data available</p>
      </PresenceTransition>

      <PresenceTransition
        visible={historyQuery.isLoading}
        transitionKey={`coin-price-graph-loading-${historyQuery.isLoading}`}
        option="fadeInOut"
      >
        <Spinner class="absolute-center size-4" />
      </PresenceTransition>
    </div>
  );

  function handleReload() {
    toast.promise(historyQuery.refetch(), {
      loading: "Reloading...",
      success: "History updated",
      error: "Failed to update history",
    });
  }
};

export default CoinPriceGraph;
