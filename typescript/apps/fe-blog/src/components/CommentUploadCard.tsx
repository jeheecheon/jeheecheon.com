import { Icon } from "solid-heroicons";
import { paperAirplane } from "solid-heroicons/solid";
import { createSignal, Show, VoidComponent } from "solid-js";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Skeleton from "~/components/Skeleton";
import Textarea from "~/components/Textarea";
import { useAccount } from "~/hooks/useAccount";
import { useUploadComment } from "~/hooks/useUploadComment";
import { cn } from "~/utils/class-name";

const CommentUploadCard: VoidComponent<{
  class?: string;
  postId: string;
  onSuccess?: () => void;
}> = (props) => {
  const [content, setContent] = createSignal("");

  const account = useAccount();
  const commentMutate = useUploadComment(() => ({
    onSuccess: handleSuccess,
  }));

  return (
    <div class={cn("", props.class)}>
      <Show
        when={account.data?.account}
        fallback={<Skeleton class="size-10 rounded-full" />}
      >
        {(account) => (
          <>
            <Image
              class="inline-block size-10 rounded-full"
              src={account().avatar}
              alt="avatar"
            />
            <span class="ml-3 inline-block">{account().email}</span>
          </>
        )}
      </Show>

      <form class="mt-3" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Leave your comment"
          value={content()}
          onInput={setContent}
        />
        <section class="ml-auto w-fit">
          <Button
            class="mt-3"
            type="submit"
            theme="primary"
            disabled={!content().trim().length}
            loading={commentMutate.isPending}
          >
            <Icon class="inline-block size-4" path={paperAirplane} />
            <span class="ml-2 inline-block text-sm">Comment</span>
          </Button>
        </section>
      </form>
    </div>
  );

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    commentMutate.mutate({
      postId: props.postId,
      content: content(),
    });
  }

  function handleSuccess() {
    setContent("");
    props.onSuccess?.();
  }
};

export default CommentUploadCard;
