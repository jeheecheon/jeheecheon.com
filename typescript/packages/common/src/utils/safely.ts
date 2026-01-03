import type { Optional } from "../types/misc.js";

export function safely<T>(callback: () => T): Optional<T> {
  try {
    return callback();
  } catch {
    return undefined;
  }
}

export async function safelyAsync<T>(
  callback: () => Promise<T>,
): Promise<Optional<T>> {
  try {
    return await callback();
  } catch {
    return undefined;
  }
}
