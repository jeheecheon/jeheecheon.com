import type { Account } from "./account.js";

export type Comment = {
  id: string;
  parentCommentId?: string;
  content: string;
  uploadedAt: string;
  isDeleted: boolean;
  depth?: number;
  account: Account;
};
