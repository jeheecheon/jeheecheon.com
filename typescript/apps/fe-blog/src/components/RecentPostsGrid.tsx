import { createEffect, VoidComponent } from "solid-js";
import { usePosts } from "~/hooks/usePosts";
import { cn } from "~/utils/class-name";

const RecentPostsGrid: VoidComponent<{
  class?: string;
}> = (props) => {
  const postsQuery = usePosts();

  createEffect(() => {
    console.log(postsQuery.data?.posts);
  });

  return <div class={cn("", props.class)}>grid</div>;
};

export default RecentPostsGrid;
