import type { Post } from "@packages/common/types/blog/post";
import { A, Navigate } from "@solidjs/router";
import { arrowLeft } from "solid-heroicons/solid";
import { VoidComponent } from "solid-js";
import { ClientOnly } from "solid-use/client-only";
import CommentsSection from "~/components/CommentsSection";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import RawHtmlRenderer from "~/components/RawHtmlRenderer";

const PostSection: VoidComponent<{
  class?: string;
  post?: Post;
}> = (props) => {
  if (!props.post) {
    return <Navigate href="/404" />;
  }

  return (
    <section>
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

      <CommentsSection class="mt-20" postId={props.post.id} />
    </section>
  );
};

export default PostSection;
