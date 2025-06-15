import { xMark } from "solid-heroicons/solid";
import { ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";
import Icon from "~/components/Icon";
import PresenceTransition from "~/components/PresenceTransition";
import { useKeydown } from "~/hooks/useKeydown";
import { useLockBodyScroll } from "~/hooks/useLockBodyScroll";
import { cn } from "~/utils/class-name";

const Modal: ParentComponent<{
  class?: string;
  title: string;
  size: "sm" | "md" | "lg";
  visible: boolean;
  onClose: () => void;
}> = (props) => {
  useKeydown("Escape", props.onClose);
  useLockBodyScroll(() => ({ locked: props.visible }));

  return (
    <Portal>
      <PresenceTransition
        transitionKey={props.visible.toString()}
        option="fadeInOut"
        visible={props.visible}
      >
        <div
          class="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4"
          onClick={props.onClose}
        >
          <div class="flex min-h-full items-center justify-center">
            <section
              class={cn(
                "h-fit w-full rounded-2xl bg-zinc-900 p-4 outline outline-offset-4 outline-orange-300",
                props.size === "sm" && "max-w-sm",
                props.size === "md" && "max-w-md",
                props.size === "lg" && "max-w-lg",
                props.class,
              )}
              onClick={handleContentClick}
            >
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-orange-200">
                  {props.title}
                </h2>
                <button
                  class="transition-transform duration-700 hover:scale-125"
                  onClick={props.onClose}
                >
                  <Icon class="size-6 text-white" path={xMark} />
                </button>
              </div>

              <div class="mt-4">{props.children}</div>
            </section>
          </div>
        </div>
      </PresenceTransition>
    </Portal>
  );

  function handleContentClick(event: MouseEvent) {
    event.stopPropagation();
  }
};

export default Modal;
