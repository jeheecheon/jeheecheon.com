import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";
import { Post } from "../post/post.entity.js";

@Entity("liked_post", { schema: "public" })
export class LikedPost {
  @PrimaryColumn("uuid")
  postId: string;

  @PrimaryColumn("uuid")
  accountId: string;

  @CreateDateColumn()
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
