export const configs = {
  NODE_ENV: import.meta.env.NODE_ENV,
  BLOG_API_URL: import.meta.env.VITE_BLOG_API_URL || "http://localhost:4001",
  BLOG_GRAPHQL_URL:
    import.meta.env.VITE_BLOG_GRAPHQL_URL || "http://localhost:4001/graphql",
};
