import { VoidComponent } from "solid-js";
import { cn } from "~/utils/class-name";

const Spinner: VoidComponent<{
  class?: string;
}> = (props) => {
  return (
    <div
      class={cn(
        "animate-spin rounded-full border-2 border-white border-t-transparent",
        props.class,
      )}
    />
  );
};

export default Spinner;
