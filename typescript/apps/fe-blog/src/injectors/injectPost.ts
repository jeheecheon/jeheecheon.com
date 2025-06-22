import type { Post } from "@packages/common/types/blog/post";
import { authClient } from "~/graphql/auth-client";
import { GET_POST } from "~/graphql/documents/post.queries";

export type InjectPostArgs = {
  id: string;
};

export const injectPost = async (args: InjectPostArgs) => {
  const { id } = args;

  return authClient.request<{ post: Post }>({
    document: GET_POST,
    variables: {
      filter: {
        id,
      },
    },
  });
};
