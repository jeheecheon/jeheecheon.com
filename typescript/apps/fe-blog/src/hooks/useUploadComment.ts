import { useMutation } from "@tanstack/solid-query";
import { mutateUpsertComment } from "~/mutators/mutateUpsertComment";

export const useUploadComment = (argsFn: () => { onSuccess?: () => void }) => {
  return useMutation(() => ({
    mutationFn: mutateUpsertComment,
    onSuccess: () => {
      argsFn().onSuccess?.();
    },
  }));
};
