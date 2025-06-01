import { type VoidComponent } from "solid-js";
import CoinPriceGraph from "~/components/CoinPriceGraph";
import Container from "~/components/Container";
import Papaer from "~/components/Papaer";

const Home: VoidComponent = () => {
  return (
    <Container class="h-full">
      <Papaer class="py-base" as="main">
        <h1 class="text-4xl font-bold">Hello, world!</h1>

        <CoinPriceGraph class="mt-4 h-96" coinId="ethereum" days={7} />
      </Papaer>
    </Container>
  );
};

export default Home;
