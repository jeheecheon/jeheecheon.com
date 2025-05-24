import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";
import { Comment } from "../comment/comment.entity.js";

@Index("liked_comment_pkey", ["accountId", "commentId"], { unique: true })
@Entity("liked_comment", { schema: "public" })
export class LikedComment {
  @Column("uuid", { primary: true, name: "comment_id" })
  commentId: string;

  @Column("uuid", { primary: true, name: "account_id" })
  accountId: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
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
