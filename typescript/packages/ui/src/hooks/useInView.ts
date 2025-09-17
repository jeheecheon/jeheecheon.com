import type { Nullable } from "@packages/common/types/misc";
import {
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  type Accessor,
} from "solid-js";
import { createClientSignal } from "solid-use/client-only";

export const useInView = (args: {
  entries: Accessor<Element[]>;
  options?: IntersectionObserverInit;
  onInView?: () => void;
}) => {
  const { entries, options, onInView } = args;

  const isClient = createClientSignal();
  const [isInView, setIsInView] = createSignal(false);

  const observer = createMemo<Nullable<IntersectionObserver>>(() => {
    if (!isClient()) {
      return null;
    }

    return new IntersectionObserver((targetEntries) => {
      const isInView = targetEntries.some((entry) => entry.isIntersecting);
      setIsInView(isInView);

      if (!isInView) {
        return;
      }

      onInView?.();
    }, options);
  });

  createEffect((prevEntries) => {
    if (prevEntries === entries()) {
      return;
    }

    observer()?.disconnect();
    entries().forEach((entry) => {
      observer()?.observe(entry);
    });

    return entries();
  });

  onCleanup(() => {
    observer()?.disconnect();
  });

  return isInView;
};
