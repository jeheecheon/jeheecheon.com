import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ExternalAuthentication } from "../external-authentication/external-authentication.entity.js";

@Entity("external_login_provider", { schema: "public" })
export class ExternalLoginProvider {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { unique: true, length: 40 })
  name: string;

  @OneToMany(
    () => ExternalAuthentication,
    (externalAuthentication) => externalAuthentication.provider,
  )
  externalAuthentications: Relation<ExternalAuthentication>[];
}
