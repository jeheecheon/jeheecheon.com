import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Post } from "../post/post.entity.js";

@Entity("hashtag", { schema: "public" })
export class Hashtag {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { unique: true, length: 40 })
  name: string;

  @ManyToMany(() => Post, (post) => post.hashtags)
  @JoinTable({
    name: "post_hashtag",
    joinColumns: [{ name: "hashtag_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "post_id", referencedColumnName: "id" }],
    schema: "public",
  })
  posts: Relation<Post>[];
}
