import { Icon } from "solid-heroicons";
import { paperAirplane } from "solid-heroicons/solid";
import { createSignal, Show, VoidComponent } from "solid-js";
import toast from "solid-toast";
import AuthOnlyButton from "~/components/AuthOnlyButton";
import Image from "~/components/Image";
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
        fallback={
          <div class="flex items-center gap-x-3">
            <div class="size-10 rounded-full bg-gradient-to-br from-orange-300/50 to-orange-500/50" />
            <span class="text-sm text-zinc-400">Sign in to comment</span>
          </div>
        }
      >
        {(account) => (
          <div class="flex items-center gap-x-3">
            <Image
              class="size-10 rounded-full"
              src={account().avatar}
              alt="avatar"
            />
            <span>{account().email}</span>
          </div>
        )}
      </Show>

      <form class="mt-3" onSubmit={handleSubmit}>
        <Textarea
          placeholder="Leave your comment"
          value={content()}
          onInput={setContent}
        />
        <section class="ml-auto w-fit">
          <AuthOnlyButton
            class="mt-3"
            type="submit"
            theme="primary"
            disabled={!content().trim().length}
            loading={mutateComment.isPending}
          >
            <Icon class="inline-block size-4" path={paperAirplane} />
            <span class="ml-2 inline-block text-sm">Comment</span>
          </AuthOnlyButton>
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
