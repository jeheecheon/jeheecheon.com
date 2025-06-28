import Quill from "quill";
import toast from "solid-toast";
import { mutateUploadImage } from "~/mutators/mutateUploadImage";
import { convertToWebpFile } from "~/utils/image";

export function undoChange(this: { quill: Quill }) {
  this.quill.history.undo();
}

export function redoChange(this: { quill: Quill }) {
  this.quill.history.redo();
}

export function insertStar(this: { quill: Quill }) {
  const cursorPosition = this.quill.getSelection()?.index;
  if (typeof cursorPosition !== "number") {
    console.error("No cursor position found");
    return;
  }

  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

export async function insertImage(this: { quill: Quill }) {
  if (typeof window !== "object") {
    console.error("Must be in browser environment");
    return;
  }

  const postId = window.location.pathname.match(/posts\/([^/]+)\/edit/)?.[1];
  if (!postId) {
    console.error("No post id found in pathname");
    return;
  }

  const cursorPosition = this.quill.getSelection()?.index;
  if (typeof cursorPosition !== "number") {
    console.error("No cursor position found");
    return;
  }

  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();

  await new Promise((resolve) => {
    input.addEventListener("change", resolve, { once: true });
  });

  const webp = await convertToWebpFile(input.files?.[0]);
  if (!webp) {
    console.error("Failed to convert image to webp");
    return;
  }

  try {
    const image = await mutateUploadImage({
      postId,
      image: webp,
    });

    this.quill.insertEmbed(cursorPosition, "image", image.url);
    this.quill.setSelection(cursorPosition + 1);
  } catch (error: unknown) {
    toast.error("Failed to upload image");
    console.error(error);
    return;
  }
}
