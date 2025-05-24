import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
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
@Index(["id"], { unique: true })
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", { nullable: true })
  parent_comment_id?: string;

  @Column("uuid")
  account_id: string;

  @Column("uuid")
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
  @JoinColumn({ name: "account_id", referencedColumnName: "id" })
  account: Relation<Account>;

  @ManyToOne(() => Comment, (comment) => comment.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "parent_comment_id", referencedColumnName: "id" }])
  parentComment: Relation<Comment>;

  @OneToMany(() => Comment, (comment) => comment.parentComment)
  comments: Relation<Comment>[];

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "post_id", referencedColumnName: "id" }])
  post: Relation<Post>;

  @OneToMany(() => LikedComment, (likedComment) => likedComment.comment)
  likedComments: Relation<LikedComment>[];
}
