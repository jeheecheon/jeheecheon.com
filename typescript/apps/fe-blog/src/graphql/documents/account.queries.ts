import { gql } from "graphql-request";
import { ACCOUNT_FRAGMENT } from "~/graphql/documents/account.fragment";

export const GET_ACCOUNT = gql`
  query GetAccount($filter: GetAccountFilter!) {
    account(filter: $filter) {
      ...AccountFragment
    }
  }
  ${ACCOUNT_FRAGMENT}
`;
