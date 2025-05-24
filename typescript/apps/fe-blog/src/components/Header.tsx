import { type VoidComponent } from "solid-js";
import { cn } from "~/utils/class-name";

const Header: VoidComponent<{ class?: string }> = (props) => {
  return <div class={cn("", props.class)}>example header</div>;
};

export default Header;
