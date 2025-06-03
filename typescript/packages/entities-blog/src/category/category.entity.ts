import type { Maybe } from "@packages/common/types/misc";
import {
  Column,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { Post } from "../post/post.entity.js";

@Entity("category", { schema: "public" })
export class Category {
  @PrimaryColumn("varchar", { length: 30, unique: true })
  id: string;

  @Column("varchar", { length: 30, nullable: true })
  @ForeignKey(() => Category)
  parentCategoryId?: Maybe<string>;

  @Column("boolean")
  isBottomLevel: boolean;

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id" })
  parentCategory: Relation<Category>;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Relation<Category>[];

  @OneToMany(() => Post, (post) => post.category)
  posts: Relation<Post>[];
}
