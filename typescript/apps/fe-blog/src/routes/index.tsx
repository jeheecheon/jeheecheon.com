import { clientOnly } from "@solidjs/start";
import { type VoidComponent } from "solid-js";
import Container from "~/components/Container";
import Papaer from "~/components/Papaer";
import Skeleton from "~/components/Skeleton";
const CoinPriceGraph = clientOnly(() => import("~/components/CoinPriceGraph"));

const Home: VoidComponent = () => {
  return (
    <Container class="h-full">
      <Papaer class="py-base" as="main">
        <h1 class="text-4xl font-bold text-orange-300">JEHEECHEON</h1>
        <div class="mt-8 h-96">
          <CoinPriceGraph
            class="h-full"
            fallback={<Skeleton class="size-full rounded-md" />}
            coinId="ethereum"
            days={7}
          />
        </div>
      </Papaer>
    </Container>
  );
};

export default Home;
