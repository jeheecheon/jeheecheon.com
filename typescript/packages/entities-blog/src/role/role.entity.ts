import {
  Entity,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";

@Entity("role", { schema: "public" })
export class Role {
  @PrimaryGeneratedColumn("increment", { type: "int4" })
  id: number;

  @PrimaryColumn("varchar", { unique: true, length: 30 })
  name: string;

  @ManyToMany(() => Account, (account) => account.roles)
  accounts: Relation<Account>[];
}
