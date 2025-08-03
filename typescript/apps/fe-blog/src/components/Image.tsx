import {
  default as PreloadedImage,
  default as PresenceTransition,
} from "@packages/ui/components/PreloadedImage";
import { cn } from "@packages/ui/utils/class-name";
import { xMark } from "solid-heroicons/outline";
import { createSignal, mergeProps, VoidComponent, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import Icon from "~/components/Icon";
import Skeleton from "~/components/Skeleton";
import { useKeydown } from "~/hooks/useKeydown";
import { useLockBodyScroll } from "~/hooks/useLockBodyScroll";

type Props = {
  class?: string;
  showPreviewOnClick?: boolean;
} & JSX.ImgHTMLAttributes<HTMLImageElement>;

const Image: VoidComponent<Props> = (_props) => {
  const props = mergeProps(
    {
      showPreviewOnClick: true,
    },
    _props,
  );

  const [previewVisible, setPreviewVisible] = createSignal(false);

  useKeydown("Escape", handleTogglePreview(false));
  useLockBodyScroll(() => ({ locked: previewVisible() }));

  return (
    <>
      <PreloadedImage
        {...props}
        class={cn(
          "",
          props.showPreviewOnClick && "cursor-pointer",
          props.class,
        )}
        renderFallback={Skeleton}
        onClick={handleTogglePreview(true)}
      />

      <Portal>
        <PresenceTransition
          class="fixed inset-0 z-50 size-full dark:bg-black/85"
          visible={previewVisible()}
          transitionKey={previewVisible().toString()}
          option="fadeInOut"
        >
          <button
            class="absolute left-4 top-4 z-10 cursor-pointer"
            onClick={handleTogglePreview(false)}
          >
            <Icon class="size-7 dark:text-orange-100" path={xMark} />
          </button>

          <div class="relative mx-auto size-full max-w-7xl">
            <PreloadedImage
              {...props}
              class="size-full object-contain"
              renderFallback={Skeleton}
            />
          </div>
        </PresenceTransition>
      </Portal>
    </>
  );

  function handleTogglePreview(visible?: boolean) {
    return () => {
      if (!props.showPreviewOnClick) {
        return;
      }

      setPreviewVisible((prev) => visible ?? !prev);
    };
  }
};

export default Image;
