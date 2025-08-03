import { cn } from "@packages/ui/utils/class-name";
import { VoidComponent } from "solid-js";

const Skeleton: VoidComponent<{ class?: string }> = (props) => {
  return <div class={cn("animate-pulse bg-zinc-800", props.class)} />;
};

export default Skeleton;
