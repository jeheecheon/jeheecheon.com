import { ParentComponent } from "solid-js";
import Header from "~/components/Header";
import { cn } from "~/utils/class-name";

const GlobalLayout: ParentComponent<{ class?: string }> = (props) => {
  return (
    <div class={cn("h-full", props.class)}>
      <Header />
      {props.children}
      {/* TODO: Add footer */}
    </div>
  );
};

export default GlobalLayout;
