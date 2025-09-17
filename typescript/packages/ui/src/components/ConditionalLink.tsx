import { A } from "@solidjs/router";
import { createMemo, type JSX, type ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

type Props = {
  class?: string;
  href?: string;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

const ConditionalLink: ParentComponent<Props> = (props) => {
  const isExternal = createMemo(() => /^\/.+/.test(props.href || ""));

  return (
    <Dynamic
      component={isExternal() ? "a" : A}
      {...(isExternal()
        ? {
            target: "_blank",
            rel: "noreferrer noopener",
          }
        : {})}
      {...props}
    >
      {props.children}
    </Dynamic>
  );
};

export default ConditionalLink;
