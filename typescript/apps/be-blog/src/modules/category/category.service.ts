import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "@packages/entities-blog/category/category.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { IDefaultListQueryOptions } from "../../utils/types.js";
import { ListCategoriesFilter } from "./category.dto.js";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async listCategories(
    filter: ListCategoriesFilter,
    options: IDefaultListQueryOptions<Category>,
  ) {
    const where: FindOptionsWhere<Category> = {};

    if (filter.id) {
      where.id = filter.id;
    }

    if (filter.parentCategoryId) {
      where.parentCategoryId = filter.parentCategoryId;
    }

    if (filter.isBottomLevel) {
      where.isBottomLevel = filter.isBottomLevel;
    }

    return this.categoryRepository.find({
      where,
      ...options,
    });
  }
}
