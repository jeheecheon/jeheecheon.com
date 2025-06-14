import { ParentComponent } from "solid-js";
import { Portal } from "solid-js/web";
import PresenceTransition from "~/components/PresenceTransition";
import { useKeydown } from "~/hooks/useKeydown";
import { cn } from "~/utils/class-name";

const Modal: ParentComponent<{
  class?: string;
  visible: boolean;
  onClose: () => void;
}> = (props) => {
  useKeydown("Escape", props.onClose);

  return (
    <Portal>
      <PresenceTransition
        transitionKey={props.visible.toString()}
        option="fadeInOut"
        visible={props.visible}
      >
        <div
          class="fixed inset-0 flex min-h-screen min-w-screen items-center justify-center bg-black/50"
          onClick={props.onClose}
        >
          <section
            class={cn("bg-white p-4", props.class)}
            onClick={handleContentClick}
          >
            {props.children}
          </section>
        </div>
      </PresenceTransition>
    </Portal>
  );

  function handleContentClick(event: MouseEvent) {
    event.stopPropagation();
  }
};

export default Modal;
