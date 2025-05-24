import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Post } from "../post/post.entity.js";

@Index("hashtag_pkey", ["id"], { unique: true })
@Index("hashtag_name_key", ["name"], { unique: true })
@Entity("hashtag", { schema: "public" })
export class Hashtag {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 40 })
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
