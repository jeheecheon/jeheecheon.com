import { blobToWebP } from "webp-converter-browser";

export const convertToWebpFile = async (
  image: File,
  options: {
    width?: number;
    height?: number;
    quality?: number;
  } = { quality: 80 },
) => {
  const blob = new Blob([image], { type: image.type });
  const webp = await blobToWebP(blob, options);
  const webpFile = new File([webp], "image.webp", { type: "image/webp" });

  return webpFile;
};
