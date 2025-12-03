export const configs = {
  RESUME_URL: import.meta.env.VITE_RESUME_URL || "//resume.jeheecheon.com",
  EMAIL: import.meta.env.VITE_MY_EMAIL || "jeheecheon@gmail.com",
  BLOG_API_URL: import.meta.env.VITE_BLOG_API_URL || "http://localhost:4001",
  BLOG_GRAPHQL_URL:
    import.meta.env.VITE_BLOG_GRAPHQL_URL || "http://localhost:4001/graphql",
};
