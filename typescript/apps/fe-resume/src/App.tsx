import Button from "@packages/ui/components/Button.jsx";
import Spinner from "@packages/ui/components/Spinner";
import Textarea from "@packages/ui/components/Textarea";
import type { Component } from "solid-js";

import "@packages/ui/styles/globals-base.css";

const App: Component = () => {
  return (
    <div class="flex h-screen w-screen items-center justify-center">
      <Button theme="primary" size="lg">
        Hello World
      </Button>
      <Spinner class="absolute-center size-10 bg-red-500" />
      <Textarea value="asd" />
      <div class="text-red-500">Hello World</div>
    </div>
  );
};

export default App;
