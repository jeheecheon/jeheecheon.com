import { gql } from "graphql-request";
import { ACCOUNT_FRAGMENT } from "~/graphql/documents/account.fragment";
import { ROLE_FRAGMENT } from "~/graphql/documents/role.fragment";

export const GET_ACCOUNT = gql`
  query GetAccount($filter: GetAccountFilter!) {
    account(filter: $filter) {
      ...AccountFragment
      roles {
        ...RoleFragment
      }
    }
  }
  ${ACCOUNT_FRAGMENT}
  ${ROLE_FRAGMENT}
`;
