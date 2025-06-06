import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import { injectPosts, type InjectPostsArgs } from "~/injectors/injectPosts";

export const usePosts = (argsFn: () => InjectPostsArgs = () => ({})) => {
  const { categoryIds, isPublic, pagination } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery(() => ({
    queryKey: ["posts", categoryIds, isPublic, pagination],
    queryFn: () => injectPosts({ categoryIds, isPublic, pagination }),
    enabled: isClient(),
  }));

  return query;
};
