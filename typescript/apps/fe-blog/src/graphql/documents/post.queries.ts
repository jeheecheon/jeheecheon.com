import { gql } from "graphql-request";
import { POST_FRAGMENT } from "./post.fragments";

export const GET_POST = gql`
  query GetPost($filter: GetPostFilter!) {
    post(filter: $filter) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const LIST_POSTS = gql`
  query ListPosts($filter: ListPostsFilter!, $pagination: PaginationInput) {
    posts(filter: $filter, pagination: $pagination) {
      ...PostFragment
    }
  }
  ${POST_FRAGMENT}
`;
