import { cn } from "@packages/ui/utils/class-name";
import { ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

const Heading: ParentComponent<{
  class?: string;
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}> = (props) => {
  return (
    <Dynamic component={props.type} class={cn("", props.class)}>
      {props.children}
    </Dynamic>
  );
};

export default Heading;
