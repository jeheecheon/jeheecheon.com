import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "@packages/entities-blog/category/category.entity";
import { CategoryResolver } from "./category.resolver.js";
import { CategoryService } from "./category.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
