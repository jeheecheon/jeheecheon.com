"use server";

import type { Post } from "@packages/common/types/blog/post";
import request from "graphql-request";
import { getRequestHeaders } from "vinxi/http";
import { GET_POST } from "~/graphql/documents/post.queries";
import { configs } from "~/utils/config";

type InjectPostArgs = {
  id: string;
};

export const injectPost = async (args: InjectPostArgs) => {
  const { id } = args;

  const headers = getRequestHeaders();

  return request<{ post: Post }>({
    url: configs.BLOG_GRAPHQL_URL,
    document: GET_POST,
    requestHeaders: {
      cookie: headers.cookie ?? "",
    },
    variables: {
      filter: {
        id,
      },
    },
  });
};
