import Container from "@packages/ui/components/Container";
import "@packages/ui/styles/globals-base.css";
import type { VoidComponent } from "solid-js";
import Resume from "~/pages/Resume";

const App: VoidComponent = () => {
  return (
    <Container>
      <Resume class="min-h-screen" />
    </Container>
  );
};

export default App;
