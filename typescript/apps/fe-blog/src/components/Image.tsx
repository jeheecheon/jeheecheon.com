import { Icon } from "solid-heroicons";
import { xMark } from "solid-heroicons/outline";
import { createSignal, Show, VoidComponent, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { Motion, Presence } from "solid-motionone";
import PreloadedImage from "~/components/PreloadedImage";
import Skeleton from "~/components/Skeleton";
import { cn } from "~/utils/class-name";

type Props = {
  class?: string;
} & JSX.ImgHTMLAttributes<HTMLImageElement>;

const Image: VoidComponent<Props> = (props) => {
  const [previewVisible, setPreviewVisible] = createSignal(false);

  return (
    <>
      <PreloadedImage
        {...props}
        class={cn("cursor-pointer", props.class)}
        renderFallback={Skeleton}
        onClick={handleTogglePreview(true)}
      />

      <Portal>
        <Presence initial>
          <Show when={previewVisible()}>
            <Motion.section
              class="fixed inset-0 z-50 bg-black/95"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div class="relative mx-auto size-full max-w-7xl">
                <button class="absolute top-4 left-4 cursor-pointer">
                  <Icon
                    class="size-7 text-orange-100"
                    path={xMark}
                    onClick={handleTogglePreview(false)}
                  />
                </button>
                <PreloadedImage
                  {...props}
                  class="size-full object-contain"
                  renderFallback={Skeleton}
                />
              </div>
            </Motion.section>
          </Show>
        </Presence>
      </Portal>
    </>
  );

  function handleTogglePreview(visible?: boolean) {
    return () => {
      setPreviewVisible((prev) => visible ?? !prev);
    };
  }
};

export default Image;
