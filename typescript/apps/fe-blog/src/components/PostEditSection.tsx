import { Post } from "@packages/common/types/blog/post";
import { VoidComponent } from "solid-js";
import ContentEditor from "~/components/ContentEditor";
import Image from "~/components/Image";
import { cn } from "~/utils/class-name";

const PostEditSection: VoidComponent<{
  class?: string;
  post: Post;
}> = (props) => {
  return (
    <div class={cn("", props.class)}>
      <Image src={props.post.cover} alt={props.post.title} />
      <ContentEditor
        class="mt-4"
        initialHtml={props.post.content}
        onChange={handleChange}
      />
    </div>
  );

  function handleChange(html: string) {
    console.log(html);
  }
};

export default PostEditSection;
