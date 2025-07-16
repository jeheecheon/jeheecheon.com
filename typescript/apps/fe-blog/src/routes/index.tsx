import { type VoidComponent } from "solid-js";
import CoinPriceGraph from "~/components/CoinPriceGraph";
import Container from "~/components/Container";
import Paper from "~/components/Paper";
import RecentPostsGrid from "~/components/RecentPostsGrid";

const Home: VoidComponent = () => {
  return (
    <Container>
      <Paper class="py-base min-h-screen" as="main">
        <h1 class="text-4xl font-bold text-orange-300">JEHEECHEON</h1>
        <CoinPriceGraph
          class="mt-8"
          coinId="cross-2"
          displayName="$CROSS"
          days={7}
        />

        <h2 class="mt-12 text-2xl font-bold text-orange-300">Recent Posts</h2>
        <RecentPostsGrid class="mt-8" />
      </Paper>
    </Container>
  );
};

export default Home;
