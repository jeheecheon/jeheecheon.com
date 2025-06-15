import { gql } from "graphql-request";

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post {
    id
    title
    content
    uploadedAt
    editedAt
    cover
    isPublic
    categoryId
    likesCount
    commentsCount
  }
`;
