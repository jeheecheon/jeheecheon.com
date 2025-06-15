import { useQuery } from "@tanstack/solid-query";
import {
  injectPostLikes,
  InjectPostLikesArgs,
} from "~/injectors/injectPostLikes";

export const usePostLikes = (
  argsFn: () => {
    initialData: number;
  } & InjectPostLikesArgs,
) => {
  const { postId, initialData } = argsFn();

  return useQuery(() => ({
    queryKey: ["post-likes", postId],
    queryFn: () => injectPostLikes({ postId }),
    initialData: { countLikedPosts: initialData },
  }));
};
