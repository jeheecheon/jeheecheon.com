import { Comment } from "@packages/common/types/blog/comment";
import { RoleId } from "@packages/common/types/blog/role";
import dayjs from "dayjs";
import { range } from "lodash-es";
import {
  createSignal,
  For,
  Match,
  Show,
  Switch,
  VoidComponent,
} from "solid-js";
import toast from "solid-toast";
import Button from "~/components/Button";
import ConfirmModal from "~/components/ConfirmModal";
import Image from "~/components/Image";
import PresenceTransition from "~/components/PresenceTransition";
import Textarea from "~/components/Textarea";
import { useAccount } from "~/hooks/useAccount";
import { useMutateComment } from "~/hooks/useMutateComment";
import { cn } from "~/utils/class-name";

const CommentCard: VoidComponent<{
  class?: string;
  comment: Comment;
  onEditSuccess: () => void;
}> = (props) => {
  const [isEditing, setIsEditing] = createSignal(false);
  const [editedContent, setEditedContent] = createSignal(props.comment.content);
  const [deleteModalVisible, setDeleteModalVisible] = createSignal(false);

  const account = useAccount();
  const commentMutate = useMutateComment();
  console.log(props.comment.account.roles);

  return (
    <>
      <div
        class={cn(
          "scrollbar-hidden flex overflow-x-auto rounded-lg",
          props.class,
        )}
      >
        <div class="flex gap-x-1.5 pt-5 has-[div]:pr-3">
          <For each={range(props.comment.depth ?? 0)}>
            {() => (
              <>
                <div class="size-1 shrink-0 rounded-full bg-orange-300" />
                <div class="size-1 shrink-0 rounded-full bg-orange-300" />
                <div class="size-1 shrink-0 rounded-full bg-orange-300" />
              </>
            )}
          </For>
        </div>

        <div class="w-full min-w-2xs space-y-2">
          <Show
            when={props.comment.account.roles?.some(
              (role) => role.id === RoleId.ADMIN,
            )}
          >
            <div class="mt-2 inline-block rounded-full bg-zinc-800 px-4 py-2 text-xs text-orange-300">
              Owner
            </div>
          </Show>

          <div>
            <Image
              class="inline-block size-10 rounded-full"
              src={props.comment.account.avatar}
            />
            <span class="ml-3 inline-block">{props.comment.account.email}</span>
          </div>

          <div class="text-sm text-zinc-500">
            {dayjs(props.comment.uploadedAt).format("YYYY-MM-DD HH:mm")}
          </div>

          <Switch>
            <Match when={isEditing()}>
              <Textarea
                class="rounded-lg bg-zinc-600 p-3"
                value={editedContent()}
                onInput={setEditedContent}
              />
            </Match>
            <Match when={!isEditing()}>
              <p class="rounded-lg bg-zinc-800 p-3">{props.comment.content}</p>
            </Match>
          </Switch>

          <Show when={account.data?.account.id === props.comment.account.id}>
            <PresenceTransition
              class="p-1 pt-0"
              transitionKey={isEditing().toString()}
              option="enterFromBottom"
              transition={{ duration: 0.1, easing: "ease-in-out" }}
            >
              <Switch>
                <Match when={isEditing()}>
                  <div class="flex gap-x-3">
                    <Button
                      theme="secondary"
                      size="xs"
                      onClick={handleToggleIsEditing}
                    >
                      Cancel
                    </Button>
                    <Button
                      theme="primary"
                      size="xs"
                      loading={commentMutate.isPending}
                      onClick={handleEditSave}
                    >
                      Save
                    </Button>
                  </div>
                </Match>
                <Match when={!isEditing()}>
                  <div class="flex gap-x-3">
                    <Button
                      theme="secondary"
                      size="xs"
                      loading={commentMutate.isPending}
                      onClick={handleToggleDeleteModal(true)}
                    >
                      Delete
                    </Button>
                    <Button
                      theme="primary"
                      size="xs"
                      onClick={handleToggleIsEditing}
                    >
                      Edit
                    </Button>
                  </div>
                </Match>
              </Switch>
            </PresenceTransition>
          </Show>
        </div>
      </div>

      <ConfirmModal
        title="Delete Comment"
        visible={deleteModalVisible()}
        onConfirm={handleDelete}
        onClose={handleToggleDeleteModal(false)}
      >
        <p>Are you sure you want to delete this comment?</p>
      </ConfirmModal>
    </>
  );

  function handleToggleIsEditing() {
    setIsEditing((prev) => {
      const next = !prev;

      if (next) {
        setEditedContent(props.comment.content);
      }

      return next;
    });
  }

  function handleEditSave() {
    commentMutate.mutate(
      {
        id: props.comment.id,
        content: editedContent(),
      },
      {
        onSuccess: () => {
          props.onEditSuccess();
          toast.success("Comment edited successfully");
        },
        onError: () => {
          toast.error("Failed to edit comment");
        },
      },
    );
  }

  function handleToggleDeleteModal(visible: boolean) {
    return () => {
      setDeleteModalVisible((prev) => visible || !prev);
    };
  }

  function handleDelete() {
    commentMutate.mutate(
      {
        id: props.comment.id,
        isDeleted: true,
      },
      {
        onSuccess: () => {
          props.onEditSuccess();
          toast.success("Comment deleted successfully");
        },
        onError: () => {
          toast.error("Failed to delete comment");
        },
      },
    );
  }
};

export default CommentCard;
