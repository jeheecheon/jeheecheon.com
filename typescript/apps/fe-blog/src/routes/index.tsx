import type { VoidComponent } from "solid-js";
import Container from "~/components/Container";
import Papaer from "~/components/Papaer";

const Home: VoidComponent = () => {
  return (
    <Container class="h-full" as="main">
      <Papaer class="py-base">Hello, World!</Papaer>
    </Container>
  );
};

export default Home;
