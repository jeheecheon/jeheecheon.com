import { useMutation } from "@tanstack/solid-query";
import {
  mutateLikeOrUnlikePost,
  MutateLikeOrUnlikePostArgs,
} from "~/mutators/mutateLikeOrUnlikePost";

export type LikeOrUnlikePostSuccessArgs = {
  isLiked: boolean;
  likesCount: number;
};

export const useLikeOrUnlikePost = (
  argsFn: () => {
    onSuccess?: (data: LikeOrUnlikePostSuccessArgs) => void;
  } & MutateLikeOrUnlikePostArgs,
) => {
  return useMutation(() => ({
    mutationFn: mutateLikeOrUnlikePost,
    onSuccess: (data) => {
      argsFn().onSuccess?.(data.likeOrUnlikePost);
    },
  }));
};
