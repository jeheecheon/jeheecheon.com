import { gql } from "graphql-request";

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    parentCommentId
    content
    uploadedAt
    isDeleted
  }
`;
