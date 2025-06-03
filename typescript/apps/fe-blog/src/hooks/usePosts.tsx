import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import { injectPosts, type InjectPostsArgs } from "~/injectors/injectPosts";

export const usePosts = (argsFn: () => InjectPostsArgs = () => ({})) => {
  const { categoryId, pagination } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery(() => ({
    queryKey: ["posts", categoryId, pagination],
    queryFn: () => injectPosts({ categoryId, pagination }),
    enabled: isClient(),
  }));

  return query;
};
