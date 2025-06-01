import { type FindOptionsOrder, type FindOptionsRelations } from "typeorm";
import { FindOptionsSelect } from "typeorm/find-options/FindOptionsSelect.js";

export type IDefaultGetQueryOptions<T> = {
  relations?: FindOptionsRelations<T>;
  order?: FindOptionsOrder<T>;
  withDeleted?: boolean;
  select?: FindOptionsSelect<T>;
};

export type IDefaultListQueryOptions<T> = IDefaultGetQueryOptions<T> & {
  take?: number;
  skip?: number;
};
