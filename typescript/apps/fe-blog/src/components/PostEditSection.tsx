import { Post } from "@packages/common/types/blog/post";
import { createSignal, VoidComponent } from "solid-js";
import toast from "solid-toast";
import ContentEditor from "~/components/ContentEditor";
import Image from "~/components/Image";
import { useMutatePost } from "~/hooks/useMutatePost";
import { useUploadImage } from "~/hooks/useUploadImage";
import { EventOf } from "~/types/misc";
import { cn } from "~/utils/class-name";
import { convertToWebpFile } from "~/utils/image";

const PostEditSection: VoidComponent<{
  class?: string;
  post: Post;
  onSuccess: () => void;
}> = (props) => {
  const [editablePost, setEditablePost] = createSignal(props.post);

  const postMutate = useMutatePost();
  const imageMutate = useUploadImage();

  return (
    <div class={cn("", props.class)}>
      <Image
        class="md:mx-auto md:w-1/2"
        src={editablePost().cover}
        alt={editablePost().title}
      />
      <input type="file" accept="image/*" onChange={handleCoverChange} />

      <ContentEditor
        class="mt-4"
        initialHtml={props.post.content}
        onChange={handleContentChange}
      />
    </div>
  );

  async function handleCoverChange(event: EventOf<HTMLInputElement>) {
    const file = await convertToWebpFile(event.currentTarget.files?.[0]);

    if (!file) {
      toast.error("No file selected or failed to convert to webp");
      return;
    }

    imageMutate.mutate(
      {
        image: file,
        postId: editablePost().id,
      },
      {
        onSuccess: (image) => {
          setEditablePost((prev) => ({
            ...prev,
            cover: image.url,
          }));
        },
        onError: () => {
          toast.error("Failed to upload image");
        },
      },
    );
  }

  function handleContentChange(html: string) {
    setEditablePost((prev) => ({
      ...prev,
      content: html,
    }));
  }

  function handleSave() {
    postMutate.mutate({
      id: editablePost().id,
      title: editablePost().title,
      content: editablePost().content,
      isPublic: editablePost().isPublic,
      cover: editablePost().cover,
      uploadedAt: new Date(),
      editedAt: new Date(),
    });
  }
};

export default PostEditSection;
