import { Optional } from "@packages/common/types/misc";
import { cn } from "@packages/ui/utils/class-name";
import he from "he";
import { HTMLElement, TextNode, type Node } from "node-html-parser";
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

  const originalStyle =
    props.node instanceof HTMLElement ? props.node.attributes.style : "";
  const originalClass =
    props.node instanceof HTMLElement ? props.node.attributes.class : "";

  return (
    <Switch
      fallback={
        <Dynamic
          {...(props.node instanceof HTMLElement ? props.node.attributes : {})}
          class={cn(
            "min-h-6",
            "[&_.ql-align-center]:text-center [&_.ql-align-justify]:text-justify [&_.ql-align-right]:text-right",
            className,
          )}
          style={{
            fontSize: getTextSize(originalClass),
            textIndent: getIndent(originalClass),
            color: getColor(originalStyle),
            backgroundColor: getBackgroundColor(originalStyle),
          }}
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
            "text-orange-300 underline visited:text-orange-400 hover:text-orange-200",
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
          class={cn(
            "my-4 overflow-x-auto rounded-md bg-zinc-800 p-4",
            className,
          )}
        />
      </Match>

      <Match when={props.node instanceof TextNode}>
        {he.decode(props.node.text)}
      </Match>

      <Match when={props.node.rawTagName === "h2"}>
        <h2
          class={cn(
            "mb-3 mt-8 border-l-4 border-l-orange-300 bg-zinc-800 p-4 text-4xl font-bold text-orange-300",
            className,
          )}
        >
          {props.children}
        </h2>
      </Match>

      <Match when={props.node.rawTagName === "h3"}>
        <h3
          class={cn(
            "mb-3 mt-8 border-l-4 border-l-orange-300 bg-zinc-800 p-4 text-3xl font-bold text-orange-300",
            className,
          )}
        >
          {props.children}
        </h3>
      </Match>

      <Match when={props.node.rawTagName === "h4"}>
        <h4
          class={cn(
            "mb-3 mt-8 border-l-4 border-l-orange-300 bg-zinc-800 p-4 text-2xl font-bold text-orange-300",
            className,
          )}
        >
          {props.children}
        </h4>
      </Match>

      <Match when={props.node.rawTagName === "h5"}>
        <h5
          class={cn(
            "mb-3 mt-8 border-l-4 border-l-orange-300 bg-zinc-800 p-4 text-xl font-bold text-orange-300",
            className,
          )}
        >
          {props.children}
        </h5>
      </Match>

      <Match when={props.node.rawTagName === "h6"}>
        <h6
          class={cn(
            "mb-3 mt-8 border-l-4 border-l-orange-300 bg-zinc-800 p-4 text-lg font-bold text-orange-300",
            className,
          )}
        >
          {props.children}
        </h6>
      </Match>

      <Match when={props.node.rawTagName === "ul"}>
        <ul
          class={cn("my-2 list-inside list-disc pl-2 [&_ul]:pl-5", className)}
        >
          {props.children}
        </ul>
      </Match>

      <Match when={props.node.rawTagName === "ol"}>
        <ol
          class={cn(
            "my-2 list-inside list-decimal pl-2 [&_ol]:pl-5",
            className,
          )}
        >
          {props.children}
        </ol>
      </Match>

      <Match when={props.node.rawTagName === "li"}>
        <li class={cn("mt-2.5", className)}>{props.children}</li>
      </Match>

      <Match when={props.node.rawTagName === "blockquote"}>
        <blockquote
          class={cn(
            "break-words border-l-4 border-zinc-800 border-l-orange-300 p-4",
            className,
          )}
        >
          {props.children}
        </blockquote>
      </Match>

      <Match when={props.node.rawTagName === "code"}>
        <code
          class={cn("mx-2 inline-block rounded-md bg-zinc-800 px-2", className)}
        >
          {props.children}
        </code>
      </Match>
    </Switch>
  );

  function getTextSize(className: Optional<string>) {
    const match = className?.match(/ql-size-(\d+)/);
    return `${Number(match?.[1] ?? 16) / 16}rem`;
  }

  function getIndent(className: Optional<string>) {
    const match = className?.match(/ql-indent-(\d+)/);
    return `${Number(match?.[1] ?? 0) * 1.5}rem`;
  }

  function getColor(style: Optional<string>) {
    const match = style?.match(/color:\s*(rgb\([^)]+\)|#[0-9a-fA-F]{6});?/);
    return match?.[1];
  }

  function getBackgroundColor(style: Optional<string>) {
    const match = style?.match(
      /background-color:\s*(rgb\([^)]+\)|#[0-9a-fA-F]{6});?/,
    );
    return match?.[1];
  }
};

export default RawHtmlRenderer;
