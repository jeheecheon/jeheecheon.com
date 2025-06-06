import { type VoidComponent } from "solid-js";
import CoinPriceGraph from "~/components/CoinPriceGraph";
import Container from "~/components/Container";
import Papaer from "~/components/Papaer";
import RecentPostsGrid from "~/components/RecentPostsGrid";

const Home: VoidComponent = () => {
  return (
    <Container>
      <Papaer class="py-base min-h-screen" as="main">
        <h1 class="text-4xl font-bold text-orange-300">JEHEECHEON</h1>
        <CoinPriceGraph class="mt-8" coinId="ethereum" days={7} />
        <RecentPostsGrid class="mt-8" />
      </Papaer>
    </Container>
  );
};

export default Home;
