import type { Maybe } from "@packages/utils/types";
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
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { nullable: true })
  @ForeignKey(() => Comment)
  parentCommentId?: Maybe<string>;

  @Column("uuid")
  @ForeignKey(() => Account)
  account_id: string;

  @Column("uuid")
  @ForeignKey(() => Post)
  post_id: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  uploadedAt: Date;

  @Column("boolean", { default: false })
  isDeleted: boolean;

  @ManyToOne(() => Account, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ referencedColumnName: "id" })
  account: Relation<Account>;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ referencedColumnName: "id" })
  parentComment: Relation<Comment>;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  comments: Relation<Comment>[];

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  @JoinColumn({ referencedColumnName: "id" })
  post: Relation<Post>;

  @OneToMany(() => LikedComment, (likedComment) => likedComment.comment)
  likedComments: Relation<LikedComment>[];
}
