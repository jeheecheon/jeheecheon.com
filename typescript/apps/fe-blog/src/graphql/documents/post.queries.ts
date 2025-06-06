import { gql } from "graphql-request";
import { POST_FRAGMENT } from "./post.fragments";

export const LIST_POSTS = gql`
  query ListPosts($filter: ListPostsFilter!, $pagination: PaginationInput) {
    posts(filter: $filter, pagination: $pagination) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
