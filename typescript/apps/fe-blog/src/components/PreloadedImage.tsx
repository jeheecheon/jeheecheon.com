import { type Nullable } from "@packages/common/types/misc";
import { cn } from "@packages/ui/utils/class-name";
import {
  createEffect,
  createSignal,
  Match,
  Show,
  Switch,
  type Component,
  type JSX,
  type VoidComponent,
} from "solid-js";
import type { EventOf } from "~/types/misc";

type Props = {
  class?: string;
  renderFallback?: Component;
} & JSX.ImgHTMLAttributes<HTMLImageElement>;

const PreloadedImage: VoidComponent<Props> = (props) => {
  const [loading, setLoading] = createSignal(true);

  let ref: Nullable<HTMLImageElement> = null;

  createEffect(() => {
    if (!ref?.complete) {
      return;
    }

    setLoading(false);
  });

  return (
    <>
      <Show when={loading()}>{props.renderFallback?.(props)}</Show>
      <Switch>
        <Match when={props.src} keyed>
          <img
            {...props}
            class={cn(
              "transition-opacity duration-300",
              loading() && "absolute opacity-0",
              props.class,
            )}
            ref={(element) => (ref = element)}
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
            onError={handleError}
          />
        </Match>
      </Switch>
    </>
  );

  function handleLoadStart(event: EventOf<HTMLImageElement>) {
    if (typeof props.onLoadStart === "function") {
      props.onLoadStart(event);
    }

    setLoading(true);
  }

  function handleLoad(event: EventOf<HTMLImageElement>) {
    if (typeof props.onLoad === "function") {
      props.onLoad(event);
    }

    setLoading(false);
  }

  function handleError(event: EventOf<HTMLImageElement, ErrorEvent>) {
    if (typeof props.onError === "function") {
      props.onError(event);
    }

    setLoading(false);
  }
};

export default PreloadedImage;
