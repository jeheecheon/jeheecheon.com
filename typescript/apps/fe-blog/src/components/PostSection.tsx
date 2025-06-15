import type { Post } from "@packages/common/types/blog/post";
import { A } from "@solidjs/router";
import dayjs from "dayjs";
import { arrowLeft, heart } from "solid-heroicons/solid";
import { createSignal, Match, Switch, VoidComponent } from "solid-js";
import { ClientOnly } from "solid-use/client-only";
import Button from "~/components/Button";
import CommentsSection from "~/components/CommentsSection";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import RawHtmlRenderer from "~/components/RawHtmlRenderer";
import {
  LikeOrUnlikePostSuccessArgs,
  useLikeOrUnlikePost,
} from "~/hooks/useLikeOrUnlikePost";
import { cn } from "~/utils/class-name";

const PostSection: VoidComponent<{
  class?: string;
  post: Post;
}> = (props) => {
  return (
    <section class={cn("", props.class)}>
      <A class="inline-block" href="/">
        <Icon path={arrowLeft} class="size-8 text-zinc-400" />
      </A>

      <Image
        class="mx-auto mt-7 aspect-square rounded-4xl object-cover object-center md:w-1/2"
        src={props.post.cover}
        alt={props.post.title}
      />

      <h1 class="mt-10 text-center text-4xl font-bold text-orange-300">
        {props.post.title}
      </h1>

      <div class="mt-20 h-px w-full bg-zinc-800" role="separator" />

      <ClientOnly>
        <RawHtmlRenderer class="mt-20" rawHtml={props.post.content} />
      </ClientOnly>

      <PostLikesButton class="mx-auto mt-20 block" post={props.post} />

      <div class="mt-4 text-center">
        <p class="text-xs text-zinc-400">Written on</p>
        <p class="text-sm font-bold text-orange-300">
          {dayjs(props.post.uploadedAt).format("YYYY-MM-DD HH:mm")}
        </p>
      </div>

      <CommentsSection class="mt-4" postId={props.post.id} />
    </section>
  );
};

const PostLikesButton: VoidComponent<{
  class?: string;
  post: Post;
}> = (props) => {
  const [isLiked, setIsLiked] = createSignal(props.post.isLiked);
  const [likesCount, setLikesCount] = createSignal(props.post.likesCount);

  const likeOrUnlikePostMutate = useLikeOrUnlikePost(() => ({
    postId: props.post.id,
    onSuccess: handleLikeOrUnlikePostSuccess,
  }));

  return (
    <Button
      class={cn("mx-auto mt-20 block", props.class)}
      theme="secondary"
      loading={likeOrUnlikePostMutate.isPending}
      onClick={handleClick}
    >
      <Switch>
        <Match when={isLiked()}>
          <Icon class="inline-block size-4 text-red-400" path={heart} />
        </Match>
        <Match when={!isLiked()}>
          <Icon class="inline-block size-4 text-zinc-400" path={heart} />
        </Match>
      </Switch>
      <span class="ml-2 inline-block text-sm text-zinc-400">
        {likesCount()}
      </span>
    </Button>
  );

  function handleClick() {
    likeOrUnlikePostMutate.mutate({
      postId: props.post.id,
    });
  }

  function handleLikeOrUnlikePostSuccess(data: LikeOrUnlikePostSuccessArgs) {
    setIsLiked(data.isLiked);
    setLikesCount(data.likesCount);
  }
};

export default PostSection;
