import Container from "@packages/ui/components/Container";
import Paper from "@packages/ui/components/Paper";
import type { Component } from "solid-js";

import "~/styles/globals.css";

const App: Component = () => {
  return (
    <Container>
      <Paper class="py-base min-h-screen" as="main">
        <h1 class="py-3 text-2xl font-bold text-orange-300">Resume.</h1>
        <p>My resume is private for now.</p>
      </Paper>
    </Container>
  );
};

export default App;
