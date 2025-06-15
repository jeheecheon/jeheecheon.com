export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  BLOG_API_URL: process.env.BLOG_API_URL || "http://localhost:4001",
  BLOG_GRAPHQL_URL:
    process.env.BLOG_GRAPHQL_URL || "http://localhost:4001/graphql",
};
