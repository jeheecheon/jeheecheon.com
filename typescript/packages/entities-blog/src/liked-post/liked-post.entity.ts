import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";
import { Post } from "../post/post.entity.js";

@Index("liked_post_pkey", ["accountId", "postId"], { unique: true })
@Entity("liked_post", { schema: "public" })
export class LikedPost {
  @Column("uuid", { primary: true, name: "post_id" })
  postId: string;

  @Column("uuid", { primary: true, name: "account_id" })
  accountId: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.likedPosts, {
    onDelete: "SET NULL",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Relation<Account>;

  @ManyToOne(() => Post, (post) => post.likedPosts, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "post_id", referencedColumnName: "id" }])
  post: Relation<Post>;
}
