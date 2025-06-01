import { Field, ObjectType } from "@nestjs/graphql";
import type { Maybe } from "@packages/utils/types";
import {
  Column,
  CreateDateColumn,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
  type Relation,
} from "typeorm";
import { Category } from "../category/category.entity.js";
import { Comment } from "../comment/comment.entity.js";
import { Hashtag } from "../hashtag/hashtag.entity.js";
import { LikedPost } from "../liked-post/liked-post.entity.js";

@Entity("post", { schema: "public" })
@ObjectType()
export class Post {
  @PrimaryColumn("uuid", { unique: true })
  @Field(() => String)
  id: string;

  @Column("varchar", { length: 50 })
  @Field(() => String)
  title: string;

  @Column("text")
  @Field(() => String)
  content: string;

  @CreateDateColumn({ type: "timestamptz" })
  @Field(() => Date)
  uploadedAt: Date;

  @UpdateDateColumn({ type: "timestamptz", nullable: true })
  @Field(() => Date, { nullable: true })
  editedAt?: Maybe<Date>;

  @Column("varchar", { nullable: true, length: 256 })
  @Field(() => String, { nullable: true })
  cover?: Maybe<string>;

  @Column("boolean", { default: false })
  @Field(() => Boolean)
  isPublic: boolean;

  @Column("uuid", { nullable: true })
  @ForeignKey(() => Category)
  @Field(() => String, { nullable: true })
  categoryId?: Maybe<string>;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Relation<Comment>[];

  @OneToMany(() => LikedPost, (likedPost) => likedPost.post)
  likedPosts: Relation<LikedPost>[];

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn([{ name: "category_id", referencedColumnName: "id" }])
  category: Relation<Category>;

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts)
  hashtags: Relation<Hashtag>[];
}
