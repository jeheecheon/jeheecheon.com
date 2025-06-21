import { gql } from "graphql-request";

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryFragment on Category {
    id
    isBottomLevel
  }
`;
