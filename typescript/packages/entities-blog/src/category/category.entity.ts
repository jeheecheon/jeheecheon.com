import { Field, ObjectType } from "@nestjs/graphql";
import type { Maybe } from "@packages/common/types/misc";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { Post } from "../post/post.entity.js";

@Entity("category", { schema: "public" })
@ObjectType()
export class Category {
  @PrimaryColumn("varchar", { length: 30, unique: true })
  @Field(() => String)
  id: string;

  @Column("varchar", { length: 30, nullable: true })
  @Field(() => String, { nullable: true })
  parentCategoryId?: Maybe<string>;

  @Column("boolean")
  @Field(() => Boolean)
  isBottomLevel: boolean;

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id" })
  @Field(() => Category, { nullable: true })
  parentCategory: Relation<Category>;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Relation<Category>[];

  @OneToMany(() => Post, (post) => post.category)
  posts: Relation<Post>[];
}
