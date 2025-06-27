import { blogClient } from "~/axios/blog-client";

export type MutateUploadImageArgs = {
  image: File;
  postId?: string;
};

export const mutateUploadImage = async (args: MutateUploadImageArgs) => {
  const formData = new FormData();

  formData.append("image", args.image);

  if (args.postId) {
    formData.append("postId", args.postId);
  }

  const { data } = await blogClient.post<{ url: string }>(
    "/image/upload",
    formData,
  );

  return data;
};
