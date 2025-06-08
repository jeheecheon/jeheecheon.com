import { For, Show, VoidComponent } from "solid-js";
import { useComments } from "~/hooks/useComments";
import { cn } from "~/utils/class-name";

const CommentsSection: VoidComponent<{
  class?: string;
  postId: string;
}> = (props) => {
  const commentsQuery = useComments(() => ({ postId: props.postId }));

  return (
    <div class={cn("mt-20", props.class)}>
      <h2 class="text-2xl font-bold text-orange-300">Comments</h2>

      <Show when={commentsQuery.isSuccess}>
        <For each={commentsQuery.data?.comments}>
          {(comment) => <div>{comment.content}</div>}
        </For>
      </Show>
    </div>
  );
};

export default CommentsSection;
