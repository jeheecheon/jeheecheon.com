import { VoidComponent } from "solid-js";
import { cn } from "~/utils/class-name";

const Skeleton: VoidComponent<{ class?: string }> = (props) => {
  return <div class={cn("animate-pulse bg-zinc-800", props.class)} />;
};

export default Skeleton;
