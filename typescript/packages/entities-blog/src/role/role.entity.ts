import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";

@Entity("role", { schema: "public" })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn("increment", { type: "int4" })
  @Field(() => Number)
  id: number;

  @Column("varchar", { unique: true, length: 30 })
  @Field(() => String)
  name: string;

  @ManyToMany(() => Account, (account) => account.roles)
  accounts: Relation<Account>[];
}
