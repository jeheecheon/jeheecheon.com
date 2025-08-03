"use server";

import PresenceTransition from "@packages/ui/components/PresenceTransition";
import { createAsync, Navigate, useParams } from "@solidjs/router";
import { Show, Suspense, VoidComponent } from "solid-js";
import { z } from "zod";
import Container from "~/components/Container";
import LoadingFallback from "~/components/LoadingFallback";
import Paper from "~/components/Paper";
import PostSection from "~/components/PostSection";
import { injectPost } from "~/injectors/injectPost.server";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

type Params = z.infer<typeof paramsSchema>;

const PostsRoute: VoidComponent = () => {
  const _params = useParams<Params>();

  const { success, data: params } = paramsSchema.safeParse(_params);
  if (!success) {
    return <Navigate href="/404" />;
  }

  const post = createAsync(() => injectPost({ id: params.id }), {
    deferStream: true,
  });

  return (
    <Container>
      <Paper class="py-base min-h-screen" as="main">
        <Suspense
          fallback={<LoadingFallback center>Loading post...</LoadingFallback>}
        >
          <PresenceTransition
            transitionKey="post"
            option="fadeInOut"
            animateOnInitialMount
          >
            <Show when={post()?.post}>
              {(post) => <PostSection post={post()} />}
            </Show>
          </PresenceTransition>
        </Suspense>
      </Paper>
    </Container>
  );
};

export default PostsRoute;
