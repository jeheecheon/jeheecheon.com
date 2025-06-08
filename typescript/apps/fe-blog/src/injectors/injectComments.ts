import type { Comment } from "@packages/common/types/blog/comment";
import request from "graphql-request";
import { LIST_COMMENTS } from "~/graphql/documents/comment.queries";
import { configs } from "~/utils/config";

export type InjectCommentsArgs = {
  postId: string;
};

export const injectComments = async (args: InjectCommentsArgs) => {
  return request<{ comments: Comment[] }>({
    url: configs.BLOG_GRAPHQL_URL,
    document: LIST_COMMENTS,
    variables: {
      filter: {
        postId: args.postId,
      },
    },
  });
};
