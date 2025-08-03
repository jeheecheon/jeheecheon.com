import { cn } from "@packages/ui/utils/class-name";
import { ParentComponent, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";

const Container: ParentComponent<{
  class?: string;
  as?: keyof JSX.HTMLElementTags;
}> = (props) => {
  return (
    <Dynamic
      component={props.as || "div"}
      class={cn("mx-auto max-w-7xl px-5 md:px-8", props.class)}
    >
      {props.children}
    </Dynamic>
  );
};

export default Container;
