import { Nullable } from "@packages/common/types/misc";
import { createEffect, createSignal } from "solid-js";
import { createClientSignal } from "solid-use/client-only";

export const useLocation = () => {
  const isClient = createClientSignal();
  const [location, setLocation] =
    createSignal<Nullable<globalThis.Location>>(null);

  createEffect(() => {
    if (isClient()) {
      setLocation(window.location);
    }
  });

  return location;
};
