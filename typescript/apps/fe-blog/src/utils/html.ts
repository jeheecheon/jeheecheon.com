import type { HTMLElement, Node } from "node-html-parser";
import parse from "node-html-parser/dist/parse";
import type { JSX, ParentProps } from "solid-js";

type RenderNodeProps = ParentProps<{
  class?: string;
  node: HTMLElement | Node;
}>;

type RenderRawHtmlOptions = {
  class?: string;
  allowedTags?: (keyof JSX.IntrinsicElements)[];
  renderNode?: (props: RenderNodeProps) => JSX.Element;
};

export function renderRawHtml(
  rawHtml: string,
  options?: RenderRawHtmlOptions,
): JSX.Element {
  return renderHtmlNode(parse(rawHtml), options);
}

export function renderHtmlNode(
  node: HTMLElement | Node,
  options?: RenderRawHtmlOptions,
): JSX.Element {
  const shouldFilterByTag = !!options?.allowedTags?.length;
  const isAllowedTag = options?.allowedTags?.includes(
    node.rawTagName as keyof JSX.IntrinsicElements,
  );
  const isAllowedParent = options?.allowedTags?.includes(
    node.parentNode?.rawTagName as keyof JSX.IntrinsicElements,
  );
  const isLeafNode = node.rawTagName === "";
  const shouldRender =
    !shouldFilterByTag || isAllowedTag || (isAllowedParent && isLeafNode);

  const renderedChildren = node.childNodes.map((child) =>
    renderHtmlNode(child, options),
  );
  const isEmptyChildren = renderedChildren.length === 0;

  if (!shouldRender && isEmptyChildren) {
    return null;
  }

  const result = isLeafNode ? node.rawText : renderedChildren;

  if (options?.renderNode) {
    return options.renderNode({
      class: options.class,
      node,
      children: result,
    });
  }

  return result;
}
