import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from "typeorm";
import { ExternalAuthentication } from "../external-uthentication/external-uthentication.entity.js";

@Index("external_login_provider_pkey", ["id"], { unique: true })
@Index("external_login_provider_name_key", ["name"], { unique: true })
@Entity("external_login_provider", { schema: "public" })
export class ExternalLoginProvider {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 40 })
  name: string;

  @OneToMany(
    () => ExternalAuthentication,
    (externalAuthentication) => externalAuthentication.provider,
  )
  externalAuthentications: Relation<ExternalAuthentication>[];
}
