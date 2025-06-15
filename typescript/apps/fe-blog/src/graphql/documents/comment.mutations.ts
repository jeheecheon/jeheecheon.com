import { gql } from "graphql-request";
import { COMMENT_FRAGMENT } from "~/graphql/documents/comment.fragment";

export const UPSERT_COMMENT = gql`
  mutation UpsertComment($args: UpsertCommentArgs!) {
    upsertComment(args: $args) {
      ...CommentFragment
    }
  }
  ${COMMENT_FRAGMENT}
`;
