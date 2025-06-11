import type { Comment } from "@packages/common/types/blog/comment";
import dayjs from "dayjs";
import { groupBy } from "lodash-es";

export const getCommentsWithDepth = (comments: Comment[]): Comment[] => {
  comments.sort((a, b) => dayjs(a.uploadedAt).diff(dayjs(b.uploadedAt)));

  const commentsMap = groupBy(
    comments,
    (comment) => comment.parentCommentId || "root",
  );

  const sortedComments: Comment[] = [];

  const addDepthToComments = (parentId: string, depth: number) => {
    const comments = commentsMap[parentId] || [];

    for (const comment of comments) {
      comment.depth = depth;
      sortedComments.push(comment);
      addDepthToComments(comment.id, depth + 1);
    }
  };

  addDepthToComments("root", 0);

  return sortedComments;
};
