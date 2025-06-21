import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { Category } from "@packages/entities-blog/category/category.entity";
import { PaginationInput } from "../../utils/dto.js";
import { handlePaginationParams } from "../../utils/pagination.js";
import { AdminSessionAuthGuard } from "../guards/admin-session-auth.guard.js";
import { ListCategoriesFilter } from "./category.dto.js";
import { CategoryService } from "./category.service.js";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category])
  @UseGuards(AdminSessionAuthGuard)
  async categories(
    @Args("filter", { nullable: true }) filter?: ListCategoriesFilter,
    @Args("pagination", { nullable: true }) pagination?: PaginationInput,
  ) {
    return this.categoryService.listCategories(
      {
        id: filter?.id,
        parentCategoryId: filter?.parentCategoryId,
        isBottomLevel: filter?.isBottomLevel,
      },
      {
        ...handlePaginationParams(pagination),
      },
    );
  }
}
