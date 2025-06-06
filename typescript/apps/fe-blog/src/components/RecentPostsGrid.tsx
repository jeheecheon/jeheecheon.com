import { PostCategory } from "@packages/common/types/blog/category";
import { range } from "lodash-es";
import { For, Show, VoidComponent } from "solid-js";
import PostCard from "~/components/PostCard";
import PresenceTransition from "~/components/PresenceTransition";
import Skeleton from "~/components/Skeleton";
import { usePosts } from "~/hooks/usePosts";
import { cn } from "~/utils/class-name";

const RecentPostsGrid: VoidComponent<{
  class?: string;
}> = (props) => {
  const postsQuery = usePosts(() => ({
    categoryIds: Object.values(PostCategory).filter(
      (category) =>
        category !== PostCategory.ABOUT_ME &&
        category !== PostCategory.PRIVACY_POLICY,
    ),
    isPublic: true,
  }));

  return (
    <PresenceTransition
      as="ul"
      class={cn("grid grid-cols-1 gap-4 md:grid-cols-2", props.class)}
      transitionKey={`recent-posts-${postsQuery.isSuccess}`}
      option="fadeInOut"
    >
      <Show
        when={postsQuery.isSuccess}
        fallback={range(10).map(() => (
          <Skeleton class="h-48 rounded-md" />
        ))}
      >
        <For each={postsQuery.data?.posts}>
          {(post) => (
            <li>
              <PostCard post={post} />
            </li>
          )}
        </For>
      </Show>
    </PresenceTransition>
  );
};

export default RecentPostsGrid;
