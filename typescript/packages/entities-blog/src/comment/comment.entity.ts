import { Field, ObjectType } from "@nestjs/graphql";
import type { Maybe } from "@packages/common/types/misc";
import {
  Column,
  CreateDateColumn,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";
import { LikedComment } from "../liked-comment/liked-comment.entity.js";
import { Post } from "../post/post.entity.js";

@Entity("comment", { schema: "public" })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("uuid", { nullable: true })
  @ForeignKey(() => Comment)
  @Field(() => String, { nullable: true })
  parentCommentId?: Maybe<string>;

  @Column("uuid")
  @ForeignKey(() => Account)
  accountId: string;

  @Column("uuid")
  @ForeignKey(() => Post)
  postId: string;

  @Column("text")
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  @Field(() => Date)
  uploadedAt: Date;

  @Column("boolean", { default: false })
  @Field(() => Boolean)
  isDeleted: boolean;

  @ManyToOne(() => Account, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ referencedColumnName: "id" })
  @Field(() => Account)
  account: Relation<Account>;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id" })
  parentComment: Relation<Comment>;

  @Field(() => [Comment])
  comments: Relation<Comment>[];

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  @JoinColumn({ referencedColumnName: "id" })
  post: Relation<Post>;

  @OneToMany(() => LikedComment, (likedComment) => likedComment.comment)
  likedComments: Relation<LikedComment>[];
}
