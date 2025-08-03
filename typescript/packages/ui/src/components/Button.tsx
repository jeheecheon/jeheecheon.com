import Spinner from "@packages/ui/components/Spinner";
import { cn } from "@packages/ui/utils/class-name";
import { ParentComponent, Show, type JSX } from "solid-js";

export type Props = {
  class?: string;
  theme?: "primary" | "secondary";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: ParentComponent<Props> = (props) => {
  return (
    <button
      {...props}
      class={cn(
        "relative inline-block rounded-xl px-4 py-2 font-semibold transition focus:outline-2 focus:outline-offset-2 active:scale-90",
        props.theme === "primary" &&
          "dark:not-disabled:hover:brightness-110 focus:outline-orange-300 disabled:brightness-75 dark:bg-orange-300 dark:text-orange-950",
        props.theme === "secondary" &&
          "dark:not-disabled:hover:brightness-110 focus:outline-zinc-600 disabled:brightness-75 dark:bg-zinc-800 dark:text-zinc-400",
        props.size === "xs" && "rounded-md px-2 py-1 text-xs",
        props.size === "sm" && "px-3 py-2 text-sm",
        props.size === "md" && "px-4 py-2 text-base",
        props.size === "lg" && "px-6 py-3 text-lg",
        props.loading && "cursor-progress",
        props.class,
      )}
    >
      <div
        class={cn(props.loading && "opacity-0 transition-opacity duration-200")}
      >
        {props.children}
      </div>

      <Show when={props.loading}>
        <Spinner class="absolute-center size-4" />
      </Show>
    </button>
  );
};

export default Button;
