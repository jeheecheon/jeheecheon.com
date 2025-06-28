import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";
import { ExternalLoginProvider } from "../external-login-provider/external-login-provider.entity.js";

@Entity("external_authentication", { schema: "public" })
export class ExternalAuthentication {
  @PrimaryColumn("integer", { unique: true })
  providerId: number;

  @PrimaryColumn("varchar", { unique: true, length: 256 })
  accountIdFromProvider: string;

  @Column("uuid")
  accountId: string;

  @ManyToOne(() => Account, (account) => account.externalAuthentications, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: Relation<Account>;

  @ManyToOne(
    () => ExternalLoginProvider,
    (externalLoginProvider) => externalLoginProvider.externalAuthentications,
    { onDelete: "CASCADE" },
  )
  @JoinColumn([{ name: "provider_id", referencedColumnName: "id" }])
  provider: Relation<ExternalLoginProvider>;
}
