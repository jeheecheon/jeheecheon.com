import type { Optional } from "@packages/common/types/misc";
import type { PaginationInput } from "./dto.js";

const DEFAULT_TAKE = 10;

export function handlePaginationParams(args: Optional<PaginationInput>) {
  return {
    take: Math.min(args?.take ?? DEFAULT_TAKE, DEFAULT_TAKE),
    skip: args?.skip ?? 0,
  };
}
