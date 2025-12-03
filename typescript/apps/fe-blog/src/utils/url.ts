import { Post } from "@packages/common/types/blog/post";
import { configs } from "~/utils/config";

export class AppUrlBuilder {
  static home() {
    return "/";
  }

  static resume() {
    return configs.RESUME_URL;
  }

  static post(post: Post) {
    return `/posts/${post.id}`;
  }

  static signOut() {
    return `${configs.BLOG_API_URL}/auth/signout`;
  }

  static adminPosts() {
    return "/admin/posts";
  }

  static adminPost(post: Post) {
    return `/admin/posts/${post.id}`;
  }
}
