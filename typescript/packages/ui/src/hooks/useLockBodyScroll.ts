import { createEffect, onCleanup } from "solid-js";

export const useLockBodyScroll = (
  argsFn: () => {
    locked: boolean;
  },
) => {
  createEffect(() => {
    if (typeof document !== "object") {
      return;
    }

    if (argsFn().locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  });

  onCleanup(() => {
    if (typeof document !== "object") {
      return;
    }

    document.body.style.overflow = "auto";
  });
};
