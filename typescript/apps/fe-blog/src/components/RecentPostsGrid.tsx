import { PostCategory } from "@packages/common/types/blog/category";
import PresenceTransition from "@packages/ui/components/PresenceTransition";
import Skeleton from "@packages/ui/components/Skeleton";
import { useInView } from "@packages/ui/hooks/useInView";
import { cn } from "@packages/ui/utils/class-name";
import { A } from "@solidjs/router";
import { range } from "lodash-es";
import { createSignal, For, Show, VoidComponent } from "solid-js";
import PostCard from "~/components/PostCard";
import { useInfinitePosts } from "~/hooks/useInfinitePosts";
import { AppUrlBuilder } from "~/utils/url";

const RecentPostsGrid: VoidComponent<{
  class?: string;
}> = (props) => {
  const [entries, setEntries] = createSignal<Element[]>([]);

  const postsQuery = useInfinitePosts(() => ({
    categoryIds: Object.values(PostCategory).filter(
      (category) =>
        category !== PostCategory.ABOUT_ME &&
        category !== PostCategory.PRIVACY_POLICY,
    ),
    isPublic: true,
  }));

  useInView({
    entries,
    onInView: handleInView,
  });

  return (
    <div class={cn("space-y-8", props.class)}>
      <PresenceTransition
        as="ul"
        class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2"
        transitionKey={`recent-posts-${postsQuery.isSuccess}`}
        option="fadeInOut"
      >
        <Show
          when={postsQuery.isSuccess}
          fallback={range(10).map(() => (
            <Skeleton class="h-102 rounded-md" />
          ))}
        >
          <For each={postsQuery.data}>
            {(post, index) => (
              <li
                ref={(element) => {
                  const length = postsQuery.data?.length ?? 0;
                  const isLast = length - 1 === index();
                  if (!isLast) {
                    return;
                  }

                  setEntries([element]);
                }}
              >
                <A href={AppUrlBuilder.post(post)}>
                  <PostCard post={post} />
                </A>
              </li>
            )}
          </For>
        </Show>
      </PresenceTransition>

      <Show when={postsQuery.isFetchingNextPage}>
        <PresenceTransition
          class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2"
          as="ul"
          transitionKey={`recent-posts-loading-more-${postsQuery.isFetchingNextPage}`}
          option="fadeInOut"
        >
          <For each={range(4)}>
            {() => (
              <li>
                <Skeleton class="h-102 rounded-md" />
              </li>
            )}
          </For>
        </PresenceTransition>
      </Show>
    </div>
  );

  function handleInView() {
    if (!postsQuery.hasNextPage) {
      return;
    }

    postsQuery.fetchNextPage();
  }
};

export default RecentPostsGrid;
