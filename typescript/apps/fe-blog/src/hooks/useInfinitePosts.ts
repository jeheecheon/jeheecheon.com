import type { PaginationInput } from "@packages/common/types/blog/pagination";
import { useInfiniteQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import { injectPosts, type InjectPostsArgs } from "~/injectors/injectPosts";

const PAGE_SIZE = 6;

export const useInfinitePosts = (
  argsFn?: () => Omit<InjectPostsArgs, "pagination">,
) => {
  const { categoryIds, isPublic } = argsFn?.() ?? {};

  const isClient = createClientSignal();

  const pagination = {
    skip: 0,
    take: PAGE_SIZE,
  } satisfies PaginationInput;

  const query = useInfiniteQuery(() => ({
    queryKey: ["posts", categoryIds, isPublic, pagination],
    initialPageParam: pagination,
    queryFn: ({ pageParam }) =>
      injectPosts({ categoryIds, isPublic, pagination: pageParam }),
    getNextPageParam: (lastPage, pages, lastPageParam) =>
      lastPage.posts.length === PAGE_SIZE
        ? {
            skip: (lastPageParam.skip ?? 0) + PAGE_SIZE,
            take: PAGE_SIZE,
          }
        : null,
    enabled: isClient(),
    select: (data) => data.pages.flatMap((page) => page.posts),
  }));

  return query;
};
