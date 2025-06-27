import { useMutation } from "@tanstack/solid-query";
import { mutateUpsertPost } from "~/mutators/mutateUpsertPost";

export const useMutatePost = () => {
  return useMutation(() => ({
    mutationFn: mutateUpsertPost,
  }));
};
