import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import {
  injectComments,
  type InjectCommentsArgs,
} from "~/injectors/injectComments";

export const useComments = (argsFn: () => InjectCommentsArgs) => {
  const { postId } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery(() => ({
    queryKey: ["comments", postId],
    queryFn: () => injectComments({ postId }),
    enabled: isClient(),
  }));

  return query;
};
