import { type ParentComponent } from "solid-js";
import { Spinner, SpinnerType } from "solid-spinner";
import { cn } from "~/utils/class-name";

const LoadingFallback: ParentComponent<{
  class?: string;
  spinnerClass?: string;
  textClass?: string;
  type?: SpinnerType;
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
      <Spinner
        class={cn("size-8", props.spinnerClass)}
        type={props.type ?? SpinnerType.threeDots}
        color="white"
      />
      <div class={cn("text-sm text-zinc-400", props.textClass)}>
        {props.children ?? "Loading..."}
      </div>
    </div>
  );
};

export default LoadingFallback;
