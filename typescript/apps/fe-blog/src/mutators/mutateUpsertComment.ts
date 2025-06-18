import { Comment } from "@packages/common/types/blog/comment";
import { authClient } from "~/graphql/auth-client";
import { UPSERT_COMMENT } from "~/graphql/documents/comment.mutations";

export type MutateUpsertCommentArgs = {
  id?: string;
  postId?: string;
  content?: string;
  isDeleted?: boolean;
};

export const mutateUpsertComment = (args: MutateUpsertCommentArgs) => {
  return authClient.request<{
    upsertComment: Comment;
  }>(UPSERT_COMMENT, {
    args,
  });
};
