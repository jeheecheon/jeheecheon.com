import { gql } from "graphql-request";
import { POST_FRAGMENT } from "./post.fragments";

export const LIST_POSTS = gql`
  query ListPosts($filter: ListPostsFilter!) {
    posts(filter: $filter) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
