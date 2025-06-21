import { Field, ObjectType } from "@nestjs/graphql";
import type { Maybe } from "@packages/common/types/misc";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Comment } from "../comment/comment.entity.js";
import { ExternalAuthentication } from "../external-authentication/external-authentication.entity.js";
import { LikedComment } from "../liked-comment/liked-comment.entity.js";
import { LikedPost } from "../liked-post/liked-post.entity.js";
import { Role } from "../role/role.entity.js";

@Entity("account", { schema: "public" })
@ObjectType()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("varchar", { length: 254 })
  @Field(() => String)
  email: string;

  @Column("varchar", { length: 254, unique: true })
  normalizedEmail: string;

  @Column("bool")
  isEmailConfirmed: boolean;

  @Column("varchar", { length: 256, nullable: true })
  @Field(() => String, { nullable: true })
  avatar?: Maybe<string>;

  @CreateDateColumn({ type: "timestamptz" })
  @Field(() => Date)
  createdAt: Date;

  @ManyToMany(() => Role, (role) => role.accounts)
  @JoinTable({
    name: "account_role",
    joinColumn: {
      name: "account_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "role_id",
      referencedColumnName: "id",
    },
  })
  @Field(() => [Role], { nullable: true })
  roles?: Relation<Role>[];

  @OneToMany(() => Comment, (comment) => comment.account)
  comments: Relation<Comment>[];

  @OneToMany(
    () => ExternalAuthentication,
    (externalAuthentication) => externalAuthentication.account,
  )
  externalAuthentications: Relation<ExternalAuthentication>[];

  @OneToMany(() => LikedComment, (likedComment) => likedComment.account)
  likedComments: Relation<LikedComment>[];

  @OneToMany(() => LikedPost, (likedPost) => likedPost.account)
  likedPosts: Relation<LikedPost>[];
}
