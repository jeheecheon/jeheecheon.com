"use server";

import { createAsync, Navigate, useParams } from "@solidjs/router";
import { Match, Show, Suspense, Switch, VoidComponent } from "solid-js";
import { z } from "zod";
import Container from "~/components/Container";
import LoadingFallback from "~/components/LoadingFallback";
import Paper from "~/components/Paper";
import PostEditSection from "~/components/PostEditSection";
import PresenceTransition from "~/components/PresenceTransition";
import { usePost } from "~/hooks/usePost";
import { injectIsAdmin } from "~/injectors/injectIsAdmin.server";

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

  const isAdminQuery = createAsync(injectIsAdmin, {
    deferStream: true,
  });

  const postQuery = usePost(() => ({ id: params.id }));

  return (
    <Container>
      <Paper class="py-base min-h-screen" as="main">
        <Suspense
          fallback={<LoadingFallback center>Loading post...</LoadingFallback>}
        >
          <Switch>
            <Match when={!isAdminQuery()?.isAdmin}>
              <p>You are not authorized to access this page</p>
            </Match>

            <Match when={isAdminQuery()?.isAdmin}>
              <PresenceTransition
                transitionKey="post"
                option="fadeInOut"
                animateOnInitialMount
              >
                <Show when={postQuery.data?.post}>
                  {(post) => (
                    <PostEditSection
                      post={post()}
                      onSuccess={postQuery.refetch}
                    />
                  )}
                </Show>
              </PresenceTransition>
            </Match>
          </Switch>
        </Suspense>
      </Paper>
    </Container>
  );
};

export default PostsRoute;
