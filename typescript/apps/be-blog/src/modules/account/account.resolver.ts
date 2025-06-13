import { Resolver } from "@nestjs/graphql";
import { Account } from "@packages/entities-blog/account/account.entity";
import { AccountService } from "./account.service.js";

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}
}
