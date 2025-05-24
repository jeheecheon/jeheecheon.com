import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  type Relation,
} from "typeorm";
import { Post } from "../post/post.entity.js";

@Index("category_pkey", ["id"], { unique: true })
@Entity("category", { schema: "public" })
export class Category {
  @Column("boolean", { name: "is_bottom_level" })
  isBottomLevel: boolean;

  @Column("varchar", { primary: true, name: "id", length: 30 })
  id: string;

  @ManyToOne(() => Category, (category) => category.categories, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "parent_category_id", referencedColumnName: "id" }])
  parentCategory: Relation<Category>;

  @OneToMany(() => Category, (category) => category.parentCategory)
  categories: Relation<Category>[];

  @OneToMany(() => Post, (post) => post.category)
  posts: Relation<Post>[];
}
