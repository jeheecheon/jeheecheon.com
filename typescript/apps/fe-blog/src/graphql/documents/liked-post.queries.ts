import { gql } from "graphql-request";

export const GET_POST_LIKES = gql`
  query GetPostLikes($args: CountLikedPostsArgs!) {
    countLikedPosts(args: $args)
  }
`;
