import type { PostCategory } from "@packages/common/types/blog/category";
import type { PaginationInput } from "@packages/common/types/blog/pagination";
import type { Post } from "@packages/common/types/blog/post";
import request from "graphql-request";
import { LIST_POSTS } from "~/graphql/documents/post.queries";
import { configs } from "~/utils/config";

export type InjectPostsArgs = {
  categoryIds?: PostCategory[];
  isPublic?: boolean;
  pagination?: PaginationInput;
};

export const injectPosts = async (args: InjectPostsArgs = {}) => {
  return request<{ posts: Post[] }>({
    url: configs.BLOG_GRAPHQL_URL,
    document: LIST_POSTS,
    variables: {
      filter: {
        categoryIds: args.categoryIds,
        isPublic: args.isPublic,
      },
      pagination: args.pagination,
    },
  });
};
