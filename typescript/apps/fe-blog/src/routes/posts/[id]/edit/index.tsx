"use server";

import Container from "@packages/ui/components/Container";
import Paper from "@packages/ui/components/Paper";
import PresenceTransition from "@packages/ui/components/PresenceTransition";
import { createAsync, Navigate, useParams } from "@solidjs/router";
import { Match, Show, Suspense, Switch, VoidComponent } from "solid-js";
import { z } from "zod";
import LoadingFallback from "~/components/LoadingFallback";
import PostEditSection from "~/components/PostEditSection";
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
