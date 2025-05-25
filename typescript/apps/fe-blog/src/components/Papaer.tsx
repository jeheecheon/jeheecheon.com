import { type FlowComponent } from "solid-js";
import { cn } from "~/utils/class-name";

const Papaer: FlowComponent<{ class?: string }> = (props) => {
  return (
    <div
      class={cn(
        "h-full md:border-x md:px-20 dark:bg-zinc-900 md:dark:border-stone-800",
        props.class,
      )}
    >
      {props.children}
    </div>
  );
};

export default Papaer;
