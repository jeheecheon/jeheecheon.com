import request from "graphql-request";
import { GET_POST_LIKES } from "~/graphql/documents/liked-post.queries";
import { configs } from "~/utils/config";

export type InjectPostLikesArgs = {
  postId: string;
};

export const injectPostLikes = (args: InjectPostLikesArgs) => {
  return request<{ countLikedPosts: number }>({
    url: configs.BLOG_GRAPHQL_URL,
    document: GET_POST_LIKES,
    variables: {
      args,
    },
  });
};
