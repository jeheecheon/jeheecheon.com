import { gql } from "graphql-request";

export const ACCOUNT_FRAGMENT = gql`
  fragment AccountFragment on Account {
    id
    email
    avatar
    createdAt
  }
`;
