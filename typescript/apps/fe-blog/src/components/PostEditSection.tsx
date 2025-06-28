import { Post } from "@packages/common/types/blog/post";
import { createSignal, VoidComponent } from "solid-js";
import toast from "solid-toast";
import Button from "~/components/Button";
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
    <form class={cn("", props.class)} onSubmit={handleSubmit}>
      <section>
        <div class="flex flex-col items-center gap-y-2">
          <Image
            class="md:w-1/2"
            src={editablePost().cover}
            alt={editablePost().title}
          />
          <input type="file" accept="image/*" onChange={handleCoverChange} />
        </div>

        <input
          class="mt-4 w-full bg-white p-2 text-zinc-900"
          type="text"
          value={editablePost().title}
          onChange={handleTitleChange}
        />

        <ContentEditor
          initialHtml={props.post.content}
          onChange={handleContentChange}
        />
      </section>

      <section class="mt-4 flex justify-end gap-2">
        <Button theme="primary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button theme="primary" loading={postMutate.isPending} type="submit">
          Save
        </Button>
      </section>
    </form>
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

  function handleTitleChange(event: EventOf<HTMLInputElement>) {
    setEditablePost((prev) => ({
      ...prev,
      title: event.currentTarget.value,
    }));
  }

  function handleContentChange(html: string) {
    setEditablePost((prev) => ({
      ...prev,
      content: html,
    }));
  }

  function handleCancel() {
    setEditablePost(props.post);
  }

  function handleSubmit(event: EventOf<HTMLFormElement>) {
    event.preventDefault();

    postMutate.mutate(
      {
        id: editablePost().id,
        title: editablePost().title,
        content: editablePost().content,
        isPublic: editablePost().isPublic,
        cover: editablePost().cover,
        uploadedAt: new Date(),
        editedAt: new Date(),
      },
      {
        onSuccess: () => {
          toast.success("Post updated");
          props.onSuccess();
        },
        onError: () => {
          toast.error("Failed to update post");
        },
      },
    );
  }
};

export default PostEditSection;
