import { useQuery } from "@tanstack/solid-query";
import { injectPosts, type InjectPostsArgs } from "~/injectors/injectPosts";

export const usePosts = (args?: InjectPostsArgs) => {
  const query = useQuery(() => ({
    queryKey: ["posts", args],
    queryFn: () => injectPosts(args),
  }));

  return query;
};
