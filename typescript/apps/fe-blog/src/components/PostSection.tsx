import type { Post } from "@packages/common/types/blog/post";
import { Navigate } from "@solidjs/router";
import { VoidComponent } from "solid-js";
import { ClientOnly } from "solid-use/client-only";
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
      <Image
        class="mx-auto aspect-square rounded-4xl object-cover object-center md:w-1/2"
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
    </section>
  );
};

export default PostSection;
