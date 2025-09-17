import type { JSX } from "solid-js";

export type EventOf<
  T extends HTMLElement,
  E extends Event = Event,
> = Parameters<JSX.EventHandler<T, E>>[0];
