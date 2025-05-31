import { A } from "@solidjs/router";
import { createMemo, type ParentComponent } from "solid-js";
import { Dynamic } from "solid-js/web";

const ConditionalLink: ParentComponent<{ class?: string; href: string }> = (
  props,
) => {
  const isExternal = createMemo(() => /^\/.+/.test(props.href));

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
