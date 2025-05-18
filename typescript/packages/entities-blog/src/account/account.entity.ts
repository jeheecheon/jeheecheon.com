import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "../role/role.entity.js";

@Entity("account", { schema: "public" })
@Index(["id", "normalizedEmail"], { unique: true })
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 254 })
  email: string;

  @PrimaryColumn("varchar", { length: 254, unique: true })
  normalizedEmail: string;

  @Column("bool")
  isEmailConfirmed: boolean;

  @Column("varchar", { length: 256, nullable: true })
  avatar?: string;

  @CreateDateColumn({ type: "timestamptz" })
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
  roles: Role[];

  // @OneToMany(() => Comment, (comment) => comment.account)
  // comments: Comment[];

  // @OneToMany(
  //   () => ExternalAuthentication,
  //   (externalAuthentication) => externalAuthentication.account,
  // )
  // externalAuthentications: ExternalAuthentication[];

  // @OneToMany(() => LikedComment, (likedComment) => likedComment.account)
  // likedComments: LikedComment[];

  // @OneToMany(() => LikedPost, (likedPost) => likedPost.account)
  // likedPosts: LikedPost[];
}
