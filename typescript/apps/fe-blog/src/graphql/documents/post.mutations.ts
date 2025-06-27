import { gql } from "graphql-request";

export const UPSERT_POST = gql`
  mutation UpsertPost($args: UpsertPostArgs!) {
    upsertPost(args: $args) {
      id
    }
  }
`;
