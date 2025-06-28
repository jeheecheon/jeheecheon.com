import { PostCategory } from "@packages/common/types/blog/category";
import { Post } from "@packages/common/types/blog/post";
import { A } from "@solidjs/router";
import dayjs from "dayjs";
import { range } from "lodash-es";
import { createSignal, For, Show, VoidComponent } from "solid-js";
import toast from "solid-toast";
import Button from "~/components/Button";
import LoadingFallback from "~/components/LoadingFallback";
import PresenceTransition from "~/components/PresenceTransition";
import Skeleton from "~/components/Skeleton";
import { useInfinitePosts } from "~/hooks/useInfinitePosts";
import { useIsInView } from "~/hooks/useIsInView";
import { useMutatePost } from "~/hooks/useMutatePost";
import { cn } from "~/utils/class-name";

type Props = {
  class?: string;
  buildPostHref: (post: Post) => string;
};

const RecentPostsList: VoidComponent<Props> = (props) => {
  const [entries, setEntries] = createSignal<Element[]>([]);

  const postMutate = useMutatePost();
  const postsQuery = useInfinitePosts(() => ({
    categoryIds: Object.values(PostCategory).filter(
      (category) =>
        category !== PostCategory.ABOUT_ME &&
        category !== PostCategory.PRIVACY_POLICY,
    ),
  }));

  useIsInView({
    entries,
    onInView: handleInView,
  });

  return (
    <div class={cn("space-y-8", props.class)}>
      <div class="flex justify-end">
        <Button theme="primary" size="sm" onClick={handleCreatePost}>
          Create Post
        </Button>
      </div>

      <PresenceTransition
        transitionKey={`recent-posts-${postsQuery.isSuccess}`}
        option="fadeInOut"
      >
        <Show
          when={postsQuery.isSuccess}
          fallback={<LoadingFallback center>Loading...</LoadingFallback>}
        >
          <div class="overflow-auto">
            <div class="max-h-[calc(100dvh-20rem)] min-w-4xl">
              <table class="w-full border border-zinc-700">
                <thead class="border-b border-zinc-700">
                  <tr class="text-right">
                    <th class="p-3 pl-5 text-left">Title</th>
                    <th class="p-3">Category</th>
                    <th class="p-3">Uploaded At</th>
                    <th class="p-3">Edited At</th>
                    <th class="p-3 pr-5" />
                  </tr>
                </thead>
                <tbody>
                  <For
                    each={
                      postsQuery.data?.pages.flatMap((page) => page.posts) ?? []
                    }
                  >
                    {(post, index) => (
                      <PostRow
                        ref={(element) => {
                          if (
                            (
                              postsQuery.data?.pages.flatMap(
                                (page) => page.posts,
                              ) ?? []
                            ).length -
                              1 !==
                            index()
                          ) {
                            return;
                          }

                          setEntries([element]);
                        }}
                        post={post}
                        buildPostHref={props.buildPostHref}
                      />
                    )}
                  </For>
                </tbody>

                <PresenceTransition
                  as="tfoot"
                  transitionKey={`recent-posts-loading-more-${postsQuery.isFetchingNextPage}`}
                  option="fadeInOut"
                  visible={postsQuery.isFetchingNextPage}
                >
                  <For each={range(10)}>
                    {() => (
                      <tr>
                        <td colspan={5}>
                          <Skeleton class="h-40 w-full rounded-md" />
                        </td>
                      </tr>
                    )}
                  </For>
                </PresenceTransition>
              </table>
            </div>
          </div>
        </Show>
      </PresenceTransition>
    </div>
  );

  function handleCreatePost() {
    postMutate.mutate(
      {
        title: "Net post",
        content: "Net post",
        isPublic: false,
        uploadedAt: new Date(),
        categoryId: PostCategory.UNCATEGORIZED,
      },
      {
        onSuccess: () => {
          postsQuery.refetch();
          toast.success("Post created successfully");
        },
        onError: () => {
          toast.error("Failed to create post");
        },
      },
    );
  }

  function handleInView() {
    if (!postsQuery.hasNextPage) {
      return;
    }

    postsQuery.fetchNextPage();
  }
};

const PostRow: VoidComponent<{
  class?: string;
  ref: (element: Element) => void;
  post: Post;
  buildPostHref: Props["buildPostHref"];
}> = (props) => {
  return (
    <tr class={cn("p-1 text-right", props.class)} ref={props.ref}>
      <td class="p-3 pl-5 text-left">{props.post.title}</td>
      <td class="p-3 text-nowrap">{props.post.categoryId}</td>
      <td class="p-3">
        {dayjs(props.post.uploadedAt).format("YYYY-MM-DD HH:mm:ss")}
      </td>
      <td class="p-3">
        {props.post.editedAt
          ? dayjs(props.post.editedAt).format("YYYY-MM-DD HH:mm:ss")
          : "N/A"}
      </td>
      <td class="p-3 pr-5">
        <div class="flex flex-nowrap gap-x-3">
          <A href={props.buildPostHref(props.post)}>
            <Button theme="primary" size="sm">
              Edit
            </Button>
          </A>
          <Button theme="secondary" size="sm">
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default RecentPostsList;
