import { Optional } from "@packages/common/types/misc";
import type { Request } from "express";

export const getAccountId = (req: Request): Optional<string> => {
  return req?.session?.account?.id;
};
