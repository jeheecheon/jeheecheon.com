import { Role } from "@packages/common/types/blog/role.js";

export type Account = {
  id: string;
  email: string;
  avatar?: string;
  createdAt: string;
  roles?: Role[];
};
