import { PostCategory } from "@packages/common/types/blog/category";
import { Post } from "@packages/common/types/blog/post";
import Button from "@packages/ui/components/Button";
import Icon from "@packages/ui/components/Icon";
import Image from "@packages/ui/components/Image";
import { EventOf } from "@packages/ui/types/misc";
import { cn } from "@packages/ui/utils/class-name";
import { A } from "@solidjs/router";
import { arrowLeft } from "solid-heroicons/outline";
import { createSignal, VoidComponent } from "solid-js";
import toast from "solid-toast";
import ContentEditor from "~/components/ContentEditor";
import { useMutatePost } from "~/hooks/useMutatePost";
import { useUploadImage } from "~/hooks/useUploadImage";
import { convertToWebpFile } from "~/utils/image";
import { AppUrlBuilder } from "~/utils/url";

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
        <A class="inline-block" href={AppUrlBuilder.adminPosts()}>
          <Icon path={arrowLeft} class="size-8 text-zinc-400" />
        </A>

        <div class="mt-7 flex flex-col items-center gap-y-2">
          <Image
            class="md:w-1/2"
            src={editablePost().cover}
            alt={editablePost().title}
          />
          <input type="file" accept="image/*" onChange={handleCoverChange} />
        </div>

        <div class="mt-4 flex items-center gap-x-2">
          <label for="category">Category</label>
          <select
            class="bg-white p-2 text-zinc-900"
            id="category"
            value={editablePost().categoryId}
            onChange={handleCategoryChange}
          >
            {Object.values(PostCategory).map((category) => (
              <option value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div class="sticky top-0 z-30 -mx-5 mt-4 flex md:mx-0">
          <input
            class="w-full bg-white p-2 text-zinc-900"
            type="text"
            value={editablePost().title}
            onChange={handleTitleChange}
          />
          <Button
            class="rounded-none"
            theme="primary"
            loading={postMutate.isPending}
            type="submit"
          >
            Save
          </Button>
        </div>

        <ContentEditor
          class="-mx-5 md:mx-0"
          toolbarClass="sticky top-10 z-30"
          htmlContent={props.post.content}
          onChange={handleContentChange}
        />

        <div class="mt-4 flex gap-x-3">
          <label class="text-sm text-zinc-400">Public</label>
          <input
            type="checkbox"
            checked={editablePost().isPublic}
            onChange={handleIsPublicChange}
          />
        </div>
      </section>

      <section class="mt-4">
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

  function handleCategoryChange(event: EventOf<HTMLSelectElement>) {
    setEditablePost((prev) => ({
      ...prev,
      categoryId: event.currentTarget.value as PostCategory,
    }));
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

  function handleIsPublicChange(event: EventOf<HTMLInputElement>) {
    setEditablePost((prev) => ({
      ...prev,
      isPublic: event.currentTarget.checked,
    }));
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
        categoryId: editablePost().categoryId,
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
