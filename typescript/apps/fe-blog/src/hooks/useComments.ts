import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import {
  injectComments,
  type InjectCommentsArgs,
} from "~/injectors/injectComments";
import { getCommentsWithDepth } from "~/utils/comment";

export const useComments = (argsFn: () => InjectCommentsArgs) => {
  const { postId } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery(() => ({
    queryKey: ["comments", postId],
    queryFn: () => injectComments({ postId }),
    select: (data) => ({
      comments: getCommentsWithDepth(data.comments),
    }),
    enabled: isClient(),
  }));

  return query;
};
