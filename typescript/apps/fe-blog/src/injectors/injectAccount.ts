import { Account } from "@packages/common/types/blog/account";
import { authClient } from "~/graphql/auth-client";
import { GET_ACCOUNT } from "~/graphql/documents/account.queries";

export type InjectAccountArgs = {
  id?: string;
  email?: string;
};

export const injectAccount = async (args: InjectAccountArgs) => {
  return authClient.request<{ account: Account }>(GET_ACCOUNT, {
    filter: args,
  });
};
