import type { Dayjs } from "dayjs";

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = Optional<Nullable<T>>;

export type DateLike = string | number | Date | Dayjs;
