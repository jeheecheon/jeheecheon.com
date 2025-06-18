import { Icon } from "solid-heroicons";
import { paperAirplane } from "solid-heroicons/solid";
import { createSignal, Show, VoidComponent } from "solid-js";
import toast from "solid-toast";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Skeleton from "~/components/Skeleton";
import Textarea from "~/components/Textarea";
import { useAccount } from "~/hooks/useAccount";
import { useMutateComment } from "~/hooks/useMutateComment";
import { cn } from "~/utils/class-name";

const CommentUploadCard: VoidComponent<{
  class?: string;
  postId: string;
  onSuccess?: () => void;
}> = (props) => {
  const [content, setContent] = createSignal("");

  const account = useAccount();
  const mutateComment = useMutateComment();

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
            loading={mutateComment.isPending}
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

    mutateComment.mutate(
      {
        postId: props.postId,
        content: content(),
      },
      {
        onSuccess: () => {
          setContent("");
          props.onSuccess?.();
          toast.success("Commented successfully");
        },
        onError: () => {
          setContent("");
          toast.error("Failed to comment");
        },
      },
    );
  }
};

export default CommentUploadCard;
