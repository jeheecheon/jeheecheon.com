import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { Account } from "@packages/entities-blog/account/account.entity";
import type { Request } from "express";
import { getUserId } from "../../utils/misc.js";
import { GetAccountFilter } from "./account.dto.js";
import { AccountService } from "./account.service.js";

@Resolver(() => Account)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(() => Account)
  async account(
    @Context("req") req: Request,
    @Args("filter") args: GetAccountFilter,
  ) {
    const id = args.id ?? getUserId(req);

    return this.accountService.getAccount({ id, email: args.email });
  }
}
