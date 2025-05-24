import {
  CreateDateColumn,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";
import { Comment } from "../comment/comment.entity.js";

@Entity("liked_comment", { schema: "public" })
export class LikedComment {
  @PrimaryColumn("uuid")
  @ForeignKey(() => Comment)
  commentId: string;

  @PrimaryColumn("uuid")
  @ForeignKey(() => Account)
  accountId: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.likedComments, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Relation<Account>;

  @ManyToOne(() => Comment, (comment) => comment.likedComments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "comment_id", referencedColumnName: "id" }])
  comment: Relation<Comment>;
}
