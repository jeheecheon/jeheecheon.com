import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  type Relation,
} from "typeorm";
import { Category } from "../category/category.entity.js";
import { Comment } from "../comment/comment.entity.js";
import { Hashtag } from "../hashtag/hashtag.entity.js";
import { LikedPost } from "../liked-post/liked-post.entity.js";

@Index("post_pkey", ["id"], { unique: true })
@Entity("post", { schema: "public" })
export class Post {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("text", { name: "content" })
  content: string;

  @Column("timestamp with time zone", {
    name: "uploaded_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  uploadedAt: Date;

  @Column("timestamp with time zone", { name: "edited_at", nullable: true })
  editedAt: Date | null;

  @Column("varchar", { name: "cover", nullable: true, length: 256 })
  cover: string | null;

  @Column("boolean", { name: "is_public", default: () => "false" })
  isPublic: boolean;

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
