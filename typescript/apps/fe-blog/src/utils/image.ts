import { Nullable } from "@packages/common/types/misc";
import { blobToWebP } from "webp-converter-browser";

export const convertToWebpFile = async (
  image?: File,
  options: {
    width?: number;
    height?: number;
    quality?: number;
  } = { quality: 80 },
): Promise<Nullable<File>> => {
  if (!image || image.type === "image/webp" || image.type === "image/gif") {
    return null;
  }

  const blob = new Blob([image], { type: image.type });
  const webp = await blobToWebP(blob, options);
  const webpFile = new File([webp], "image.webp", { type: "image/webp" });

  return webpFile;
};
