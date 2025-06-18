import { useMutation } from "@tanstack/solid-query";
import { mutateUpsertComment } from "~/mutators/mutateUpsertComment";

export const useMutateComment = () => {
  return useMutation(() => ({
    mutationFn: mutateUpsertComment,
  }));
};
