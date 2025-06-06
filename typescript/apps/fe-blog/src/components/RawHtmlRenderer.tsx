import parse, { HTMLElement, TextNode, type Node } from "node-html-parser";
import { VoidComponent, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import Image from "~/components/Image";

const RawHtmlRenderer: VoidComponent<{ rawHtml: string }> = (props) => {
  return renderToJSX(parse(props.rawHtml));

  function renderToJSX(node: HTMLElement | Node): JSX.Element {
    if (node instanceof HTMLElement && node.rawTagName === "img") {
      return <Image {...node.attributes} />;
    }

    if (node instanceof TextNode) {
      return node.rawText;
    }

    return (
      <Dynamic
        component={node.rawTagName || "div"}
        {...(node instanceof HTMLElement ? node.attributes : {})}
      >
        {node.childNodes.map(renderToJSX)}
      </Dynamic>
    );
  }
};

export default RawHtmlRenderer;
