import type { Request } from "express";

export const getUserId = (req: Request) => {
  return req.session?.account?.id;
};
