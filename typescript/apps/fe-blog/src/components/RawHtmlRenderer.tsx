import parse, { HTMLElement, type Node } from "node-html-parser";
import {
  createMemo,
  Match,
  Switch,
  VoidComponent,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import ConditionalLink from "~/components/ConditionalLink";
import Image from "~/components/Image";
import { cn } from "~/utils/class-name";

const RawHtmlRenderer: VoidComponent<{
  rawHtml: string;
  allowedTags?: (keyof JSX.IntrinsicElements)[];
}> = (props) => {
  const rendered = createMemo(() => renderToJsx(parse(props.rawHtml)));

  return rendered();

  function renderToJsx(node: HTMLElement | Node) {
    const shouldFilterByTag = !!props.allowedTags?.length;
    const isAllowedTag = props.allowedTags?.includes(
      node.rawTagName as keyof JSX.IntrinsicElements,
    );
    const isAllowedParent = props.allowedTags?.includes(
      node.parentNode?.rawTagName as keyof JSX.IntrinsicElements,
    );
    const isLeafNode = node.rawTagName === "";
    const shouldRender =
      !shouldFilterByTag || isAllowedTag || (isAllowedParent && isLeafNode);

    const renderedChildren = node.childNodes.map(renderToJsx);
    const isEmptyChildren = renderedChildren.length === 0;

    if (!shouldRender && isEmptyChildren) {
      return null;
    }

    return (
      <RenderAsSolidComponent node={node}>
        {isLeafNode ? node.rawText : renderedChildren}
      </RenderAsSolidComponent>
    );
  }
};

const RenderAsSolidComponent: ParentComponent<{
  node: HTMLElement | Node;
}> = (props) => {
  const className =
    props.node instanceof HTMLElement ? props.node.attributes.class : "";

  return (
    <Switch
      fallback={
        <Dynamic
          component={props.node.rawTagName || "div"}
          {...(props.node instanceof HTMLElement ? props.node.attributes : {})}
        >
          {props.children}
        </Dynamic>
      }
    >
      <Match when={props.node.rawTagName === "img"}>
        <Image
          {...(props.node instanceof HTMLElement ? props.node.attributes : {})}
          class={cn("rounded-md", className)}
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
