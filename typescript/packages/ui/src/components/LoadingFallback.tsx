import Spinner from "@packages/ui/components/Spinner";
import { cn } from "@packages/ui/utils/class-name";
import { type ParentComponent } from "solid-js";

const LoadingFallback: ParentComponent<{
  class?: string;
  spinnerClass?: string;
  textClass?: string;
  center?: boolean;
}> = (props) => {
  return (
    <div
      class={cn(
        "flex flex-col items-center justify-center gap-y-3 rounded-xl bg-zinc-800 p-6 outline outline-offset-4 outline-orange-300 transition-all duration-300 hover:outline-offset-2 hover:outline-orange-400",
        props.center && "absolute-center",
        props.class,
      )}
    >
      <Spinner class="size-4" />
      <div class={cn("text-sm text-zinc-400", props.textClass)}>
        {props.children ?? "Loading..."}
      </div>
    </div>
  );
};

export default LoadingFallback;
