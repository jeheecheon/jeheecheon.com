import type { Post } from "@packages/common/types/blog/post";
import { VoidComponent } from "solid-js";
import RawHtmlRenderer from "~/components/RawHtmlRenderer";
import { cn } from "~/utils/class-name";

const PostCard: VoidComponent<{ class?: string; post: Post }> = (props) => {
  return (
    <article class={cn("", props.class)}>
      <h3>{props.post.title}</h3>
      <RawHtmlRenderer rawHtml={props.post.content} allowedTags={["p"]} />
    </article>
  );
};

export default PostCard;
