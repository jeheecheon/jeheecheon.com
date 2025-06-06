import parse, { type HTMLElement } from "node-html-parser";
import { VoidComponent, type JSX } from "solid-js";
import Image from "~/components/Image";

const RawHtmlRenderer: VoidComponent<{ rawHtml: string }> = (props) => {
  return renderToJsx(parse(props.rawHtml));

  function renderToJsx(node: HTMLElement): JSX.Element {
    if (node.rawTagName === "img") {
      return <Image {...node.attributes} />;
    }

    return node.children.map(renderToJsx);
  }
};

export default RawHtmlRenderer;
