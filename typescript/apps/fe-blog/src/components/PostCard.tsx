import type { Post } from "@packages/common/types/blog/post";
import dayjs from "dayjs";
import { chatBubbleBottomCenterText, heart } from "solid-heroicons/solid";
import { VoidComponent } from "solid-js";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import { cn } from "~/utils/class-name";
import { renderRawHtml } from "~/utils/html";

const PostCard: VoidComponent<{ class?: string; post: Post }> = (props) => {
  return (
    <article
      class={cn(
        "group/card overflow-clip rounded-md bg-zinc-800 transition-transform duration-700 hover:-translate-y-2",
        props.class,
      )}
    >
      <div class="h-60 overflow-hidden">
        <Image
          class="size-full object-cover object-center transition-transform duration-300 group-hover/card:scale-105"
          src={props.post.cover}
          alt={props.post.title}
        />
      </div>

      <div class="divide-y divide-zinc-700">
        <section class="p-3">
          <h3 class="text-lg font-bold text-orange-300">{props.post.title}</h3>

          <div class="mt-2 line-clamp-3 h-15 text-sm text-zinc-300">
            {renderRawHtml(props.post.content, {
              allowedTags: ["p", "code", "a"],
            })}
          </div>
        </section>

        <section class="flex items-center justify-between p-3">
          <div>
            <div class="inline-flex items-center gap-x-2">
              <Icon class="size-4 text-red-400" path={heart} />
              <span class="text-sm text-zinc-400">{props.post.likesCount}</span>
            </div>
            <div class="ml-4 inline-flex items-center gap-x-2">
              <Icon
                class="size-4 text-blue-400"
                path={chatBubbleBottomCenterText}
              />
              <span class="text-sm text-zinc-400">
                {props.post.commentsCount}
              </span>
            </div>
          </div>

          <div class="text-sm font-medium text-orange-300">
            {dayjs(props.post.uploadedAt).format("YYYY-MM-DD")}
          </div>
        </section>
      </div>
    </article>
  );
};

export default PostCard;
