import { gql } from "graphql-request";

export const LIKE_OR_UNLIKE_POST = gql`
  mutation LikeOrUnlikePost($args: LikeOrUnlikePostArgs!) {
    likeOrUnlikePost(args: $args) {
      isLiked
      likesCount
    }
  }
`;
