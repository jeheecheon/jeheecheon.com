import { Nullable } from "@packages/common/types/misc";
import { EventOf } from "@packages/ui/types/misc";
import { cn } from "@packages/ui/utils/class-name";
import {
  createComputed,
  createEffect,
  mergeProps,
  onCleanup,
  VoidComponent,
} from "solid-js";
import { createClientSignal } from "solid-use/client-only";

const Textarea: VoidComponent<{
  class?: string;
  maxHeight?: number;
  value?: string;
  placeholder?: string;
  onInput?: (value: string) => void;
}> = (_props) => {
  const props = mergeProps({ maxHeight: 150 }, _props);

  const isClient = createClientSignal();

  let hiddenTextareaElement: Nullable<HTMLTextAreaElement> = null;
  let textAreaElement: Nullable<HTMLTextAreaElement> = null;

  createEffect(() => {
    if (!isClient()) {
      return;
    }

    void props.value;
    adjustHeight();
  });

  createComputed(() => {
    if (!isClient()) {
      return;
    }

    adjustHeight();
    window.addEventListener("resize", adjustHeight);
  });

  onCleanup(() => {
    if (!isClient()) {
      return;
    }

    window.removeEventListener("resize", adjustHeight);
  });

  return (
    <div class={cn("relative rounded-lg bg-zinc-800 p-3", props.class)}>
      <textarea
        class="invisible absolute h-auto min-h-10 w-full resize-none"
        ref={(element) => (hiddenTextareaElement = element)}
        rows={1}
        value={props.value}
      />

      <textarea
        class="min-h-10 w-full resize-none outline-none"
        ref={(element) => (textAreaElement = element)}
        rows={1}
        placeholder={props.placeholder}
        value={props.value}
        onInput={handleInput}
      />
    </div>
  );

  function handleInput(event: EventOf<HTMLTextAreaElement>) {
    props.onInput?.(event.currentTarget.value);
    adjustHeight();
  }

  function adjustHeight() {
    if (!hiddenTextareaElement || !textAreaElement) {
      return;
    }

    hiddenTextareaElement.value = textAreaElement.value;
    textAreaElement.style.height =
      Math.min(hiddenTextareaElement.scrollHeight, props.maxHeight) + "px";
  }
};

export default Textarea;
