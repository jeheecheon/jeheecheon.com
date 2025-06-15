import { ParentComponent, Show, type JSX } from "solid-js";
import { Spinner, SpinnerType } from "solid-spinner";
import { cn } from "~/utils/class-name";

type Props = {
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
          "focus:outline-orange-300 dark:bg-orange-300 dark:text-orange-950 dark:hover:brightness-110",
        props.theme === "secondary" &&
          "focus:outline-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:brightness-110",
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
        <Spinner
          class="absolute top-1/2 left-1/2 size-8 -translate-x-1/2 -translate-y-1/2"
          color="white"
          type={SpinnerType.threeDots}
        />
      </Show>
    </button>
  );
};

export default Button;
