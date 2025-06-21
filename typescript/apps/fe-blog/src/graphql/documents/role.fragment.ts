import { gql } from "graphql-request";

export const ROLE_FRAGMENT = gql`
  fragment RoleFragment on Role {
    id
    name
  }
`;
