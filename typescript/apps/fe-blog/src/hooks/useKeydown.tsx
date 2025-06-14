import { onCleanup, onMount } from "solid-js";

export const useKeydown = (key: string, callback: () => void) => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === key) {
      callback();
    }
  }

  onMount(() => {
    if (typeof window !== "object") {
      return;
    }

    window.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    if (typeof window !== "object") {
      return;
    }

    window.removeEventListener("keydown", handleKeyDown);
  });
};
