import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  type Relation,
} from "typeorm";
import { Account } from "../account/account.entity.js";
import { ExternalLoginProvider } from "../external-login-provider/external-login-provider.entity.js";

@Index(
  "external_authentication_account_id_from_provider_key",
  ["accountIdFromProvider"],
  { unique: true },
)
@Index(
  "external_authentication_pkey",
  ["accountIdFromProvider", "providerId"],
  { unique: true },
)
@Entity("external_authentication", { schema: "public" })
export class ExternalAuthentication {
  @Column("integer", { primary: true, name: "provider_id" })
  providerId: number;

  @Column("varchar", {
    primary: true,
    name: "account_id_from_provider",
    length: 256,
  })
  accountIdFromProvider: string;

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
