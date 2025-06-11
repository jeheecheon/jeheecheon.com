export type Comment = {
  id: string;
  parentCommentId?: string;
  content: string;
  uploadedAt: string;
  isDeleted: boolean;
  depth?: number;
};
