import type { PostCategory } from "@packages/common/types/blog/category";

export type Post = {
  id: string;
  title: string;
  content: string;
  uploadedAt: string;
  editedAt: string;
  deletedAt?: string;
  cover: string;
  isPublic: boolean;
  categoryId: PostCategory;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
};
