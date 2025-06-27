import { useMutation } from "@tanstack/solid-query";
import { mutateUploadImage } from "~/mutators/mutateUploadImage";

export const useUploadImage = () => {
  return useMutation(() => ({
    mutationFn: mutateUploadImage,
  }));
};
