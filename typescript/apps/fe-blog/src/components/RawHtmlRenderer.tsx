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
  rawHtml: string;
  allowedTags?: (keyof JSX.IntrinsicElements)[];
}> = (props) => {
  const rendered = createMemo(() =>
    renderRawHtml(props.rawHtml, {
      allowedTags: props.allowedTags,
      renderNode: HtmlNodeRenderer,
    }),
  );

  return rendered();
};

const HtmlNodeRenderer: ParentComponent<{
  node: HTMLElement | Node;
}> = (props) => {
  const className = cn(
    props.node instanceof HTMLElement && props.node.attributes.class,
  );

  return (
    <Switch
      fallback={
        <Dynamic
          {...(props.node instanceof HTMLElement ? props.node.attributes : {})}
          class={cn("", className)}
          component={props.node.rawTagName || "div"}
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
      <Match when={props.node.rawTagName === "pre"}>
        <pre
          {...(props.node instanceof HTMLElement
            ? {
                ...props.node.attributes,
                innerHTML: props.node.innerHTML,
              }
            : {})}
          class={cn("rounded-md bg-zinc-800 p-3", className)}
        />
      </Match>
    </Switch>
  );
};

export default RawHtmlRenderer;
