import { HTMLElement, type Node } from "node-html-parser";
import {
  createMemo,
  Match,
  Switch,
  type JSX,
  type ParentComponent,
  type VoidComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import ConditionalLink from "~/components/ConditionalLink";
import Image from "~/components/Image";
import { cn } from "~/utils/class-name";
import { renderRawHtml } from "~/utils/html";

const RawHtmlRenderer: VoidComponent<{
  class?: string;
  rawHtml: string;
  allowedTags?: (keyof JSX.IntrinsicElements)[];
}> = (props) => {
  const rendered = createMemo(() =>
    renderRawHtml(props.rawHtml, {
      class: props.class,
      allowedTags: props.allowedTags,
      renderNode: HtmlNodeRenderer,
    }),
  );

  return rendered();
};

const HtmlNodeRenderer: ParentComponent<{
  class?: string;
  node: HTMLElement | Node;
}> = (props) => {
  const className = cn(
    props.class,
    props.node instanceof HTMLElement ? props.node.attributes.class : "",
  );

  return (
    <Switch
      fallback={
        <Dynamic
          {...(props.node instanceof HTMLElement ? props.node.attributes : {})}
          component={props.node.rawTagName || "div"}
          class={cn("", className)}
        >
          {props.children}
        </Dynamic>
      }
    >
      <Match when={props.node.rawTagName === "img"}>
        <Image
          {...(props.node instanceof HTMLElement ? props.node.attributes : {})}
          class={cn("mx-auto rounded-md lg:w-1/2", className)}
        />
      </Match>
      <Match when={props.node.rawTagName === "a"}>
        <ConditionalLink
          {...(props.node instanceof HTMLElement ? props.node.attributes : {})}
          class={cn(
            "text-orange-300 visited:text-orange-400 hover:underline",
            className,
          )}
        >
          {props.children}
        </ConditionalLink>
      </Match>
    </Switch>
  );
};

export default RawHtmlRenderer;
