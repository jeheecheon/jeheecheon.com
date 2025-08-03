import { cn } from "@packages/ui/utils/class-name";
import { type FlowComponent, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

const Paper: FlowComponent<{
  class?: string;
  as?: keyof JSX.HTMLElementTags;
}> = (props) => {
  return (
    <Dynamic
      class={cn(
        "h-full md:border-x md:px-20 dark:bg-zinc-900 md:dark:border-stone-800",
        props.class,
      )}
      component={props.as ?? "div"}
    >
      {props.children}
    </Dynamic>
  );
};

export default Paper;
