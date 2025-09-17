import { onCleanup, onMount } from "solid-js";
import { createClientSignal } from "solid-use/client-only";

export const useKeydown = (key: string, callback: () => void) => {
  const isClient = createClientSignal();

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === key) {
      callback();
    }
  }

  onMount(() => {
    if (!isClient()) {
      return;
    }

    window.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    if (!isClient()) {
      return;
    }

    window.removeEventListener("keydown", handleKeyDown);
  });
};
