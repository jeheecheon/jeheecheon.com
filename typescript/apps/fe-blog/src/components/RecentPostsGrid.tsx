import { PostCategory } from "@packages/common/types/blog/category";
import { cn } from "@packages/ui/utils/class-name";
import { A } from "@solidjs/router";
import { range } from "lodash-es";
import { createSignal, For, Show, VoidComponent } from "solid-js";
import PostCard from "~/components/PostCard";
import PresenceTransition from "~/components/PresenceTransition";
import Skeleton from "~/components/Skeleton";
import { useInfinitePosts } from "~/hooks/useInfinitePosts";
import { useIsInView } from "~/hooks/useIsInView";

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

  useIsInView({
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
          <For
            each={postsQuery.data?.pages.flatMap((page) => page.posts) ?? []}
          >
            {(post, index) => (
              <li
                ref={(element) => {
                  if (
                    (postsQuery.data?.pages.flatMap((page) => page.posts) ?? [])
                      .length -
                      1 !==
                    index()
                  ) {
                    return;
                  }

                  setEntries([element]);
                }}
              >
                <A href={`/posts/${post.id}`}>
                  <PostCard post={post} />
                </A>
              </li>
            )}
          </For>
        </Show>
      </PresenceTransition>

      <PresenceTransition
        as="ul"
        class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2"
        transitionKey={`recent-posts-loading-more-${postsQuery.isFetchingNextPage}`}
        option="fadeInOut"
        visible={postsQuery.isFetchingNextPage}
      >
        <For each={range(4)}>
          {() => (
            <li>
              <Skeleton class="h-102 rounded-md" />
            </li>
          )}
        </For>
      </PresenceTransition>
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
