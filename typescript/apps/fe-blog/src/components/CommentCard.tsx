import { Comment } from "@packages/common/types/blog/comment";
import dayjs from "dayjs";
import { range } from "lodash-es";
import { For, VoidComponent } from "solid-js";
import Image from "~/components/Image";
import { cn } from "~/utils/class-name";

const CommentCard: VoidComponent<{ class?: string; comment: Comment }> = (
  props,
) => {
  return (
    <div
      class={cn(
        "scrollbar-hidden flex overflow-x-auto rounded-lg",
        props.class,
      )}
    >
      <div class="flex gap-x-1.5 pt-5 has-[div]:pr-3">
        <For each={range(props.comment.depth ?? 0)}>
          {() => (
            <>
              <div class="size-1 shrink-0 rounded-full bg-orange-300" />
              <div class="size-1 shrink-0 rounded-full bg-orange-300" />
              <div class="size-1 shrink-0 rounded-full bg-orange-300" />
            </>
          )}
        </For>
      </div>

      <div class="min-w-2xs">
        <Image
          class="inline-block size-10 rounded-full"
          src={props.comment.account.avatar}
        />
        <span class="ml-3 inline-block">{props.comment.account.email}</span>
        <div class="mt-2 text-sm text-zinc-500">
          {dayjs(props.comment.uploadedAt).format("YYYY-MM-DD HH:mm")}
        </div>
        <p class="mt-3">{props.comment.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
