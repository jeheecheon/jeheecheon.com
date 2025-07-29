"use server";

import { Category } from "@packages/common/types/blog/category";
import request from "graphql-request";
import { getRequestHeaders } from "vinxi/http";
import { GET_CATEGORIES } from "~/graphql/documents/category.queries";
import { configs } from "~/utils/config";

export type InjectCategoriesArgs = {
  id?: string;
  parentCategoryId?: string;
  isBottomLevel?: boolean;
};

export const injectCategories = async (args?: InjectCategoriesArgs) => {
  const headers = getRequestHeaders();

  return request<{ categories: Category[] }>({
    url: configs.BLOG_GRAPHQL_URL,
    document: GET_CATEGORIES,
    requestHeaders: {
      cookie: headers.cookie ?? "",
    },
    variables: {
      filter: args,
    },
  });
};
