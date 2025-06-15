import { authClient } from "~/graphql/auth-client";
import { LIKE_OR_UNLIKE_POST } from "~/graphql/documents/liked-post.mutations";

export type MutateLikeOrUnlikePostArgs = {
  postId: string;
};

export const mutateLikeOrUnlikePost = (args: MutateLikeOrUnlikePostArgs) => {
  return authClient.request<{
    likeOrUnlikePost: {
      isLiked: boolean;
      likesCount: number;
    };
  }>(LIKE_OR_UNLIKE_POST, {
    args: {
      postId: args.postId,
    },
  });
};
