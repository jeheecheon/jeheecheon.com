import { GraphQLClient } from "graphql-request";
import { configs } from "~/utils/config";

export const authClient = new GraphQLClient(configs.BLOG_GRAPHQL_URL, {
  fetch: (url, options) => fetch(url, { ...options, credentials: "include" }),
});
