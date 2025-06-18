import { For, Show, VoidComponent } from "solid-js";
import CommentCard from "~/components/CommentCard";
import CommentUploadCard from "~/components/CommentUploadCard";
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

      <CommentUploadCard
        class="mt-5"
        postId={props.postId}
        onSuccess={commentsQuery.refetch}
      />

      <ul class="mt-10">
        <Show when={commentsQuery.isSuccess}>
          <For each={commentsQuery.data?.comments}>
            {(comment) => (
              <li class={cn("pt-5", comment.parentCommentId && "pt-2")}>
                <CommentCard
                  comment={comment}
                  onEditSuccess={commentsQuery.refetch}
                />
              </li>
            )}
          </For>
        </Show>
      </ul>
    </div>
  );
};

export default CommentsSection;
