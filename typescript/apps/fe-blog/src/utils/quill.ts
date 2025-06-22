/* eslint-disable @typescript-eslint/no-explicit-any */

// import { convertToWebPFromFile } from "@/posts/edit/_utils/webp";

export function undoChange(this: any) {
  this.quill.history.undo();
}

export function redoChange(this: any) {
  this.quill.history.redo();
}

export function insertStar(this: any) {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

// export async function insertImage(this: any) {
//   // Get the post id that the writer is editing on
//   const post_id = (
//     document.getElementById("IdOfPostEditing") as HTMLInputElement
//   ).value;
//   if (post_id === null || post_id === undefined) return;

//   // Create an input tag and get it clicked
//   const input = document.createElement("input");
//   input.type = "file";
//   input.accept = "image/*";
//   input.click();

//   // Wait until any file has been selected
//   await new Promise((resolve) => {
//     input.addEventListener("change", resolve, { once: true });
//   });

//   // Store the selected image into this var
//   const image = (input as HTMLInputElement).files![0];

//   // Error checking if the file was successfuly selected
//   if (!image) {
//     console.error("File not selected...");
//     return;
//   }

//   // Convert the image to webp format
//   const webp = await convertToWebPFromFile(image, { quality: 0.75 });

//   // Prepare for file transter
//   let imageUrl = "";
//   const formData = new FormData();
//   formData.append("image", webp);
//   await fetch(
//     `${
//       import.meta.env.VITE_SERVER_URL
//     }/api/blog/posts/${post_id}/images/upload`,
//     {
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
//       },
//       method: "POST",
//       body: formData,
//     },
//   )
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throwResponse(res);
//       }
//     })
//     .then((newImageUrl: string) => {
//       if (newImageUrl && newImageUrl !== "") {
//         console.log(newImageUrl);
//         imageUrl = newImageUrl;
//       } else {
//         throwError("Failed to upload the image");
//       }
//     })
//     .catch(handleError);

//   // Insert an image tag with the returned image url when the fetch call was successful
//   if (imageUrl !== "") {
//     const cursorPosition = this.quill.getSelection().index;
//     this.quill.pasteHTML(cursorPosition, `<img src="${imageUrl}" />`);
//     this.quill.setSelection(cursorPosition + 1);
//   }
// }
