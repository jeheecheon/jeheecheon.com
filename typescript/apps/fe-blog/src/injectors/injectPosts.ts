import type { PostCategory } from "@packages/common/types/blog/category";
import type { PaginationInput } from "@packages/common/types/blog/pagination";
import type { Post } from "@packages/common/types/blog/post";
import request from "graphql-request";
import { LIST_POSTS } from "~/graphql/documents/post.queries";
import { configs } from "~/utils/config";

export type InjectPostsArgs = {
  categoryId?: PostCategory;
  pagination?: PaginationInput;
};

export const injectPosts = async (args: InjectPostsArgs = {}) => {
  const data = await request<{ posts: Post[] }>({
    url: configs.BLOG_GRAPHQL_URL,
    document: LIST_POSTS,
    variables: {
      filter: {
        categoryId: args.categoryId,
      },
    },
  });

  return data;
};
