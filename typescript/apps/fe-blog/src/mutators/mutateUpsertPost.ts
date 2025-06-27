import { Post } from "@packages/common/types/blog/post";
import { authClient } from "~/graphql/auth-client";
import { UPSERT_POST } from "~/graphql/documents/post.mutations";

export type MutateUpsertPostArgs = {
  id?: string;
  title: string;
  content: string;
  isPublic: boolean;
  uploadedAt: Date;
  editedAt?: Date;
  cover?: string;
  categoryId?: string;
};

export const mutateUpsertPost = (args: MutateUpsertPostArgs) => {
  return authClient.request<{
    upsertPost: Post;
  }>(UPSERT_POST, {
    args,
  });
};
