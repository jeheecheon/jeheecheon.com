import { gql } from "graphql-request";
import { COMMENT_FRAGMENT } from "~/graphql/documents/comment.fragment";

export const LIST_COMMENTS = gql`
  query ListComments($filter: ListCommentsFilter!) {
    comments(filter: $filter) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;
