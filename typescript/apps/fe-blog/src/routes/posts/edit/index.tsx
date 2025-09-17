import { Post } from "@packages/common/types/blog/post";
import Container from "@packages/ui/components/Container";
import LoadingFallback from "@packages/ui/components/LoadingFallback";
import Paper from "@packages/ui/components/Paper";
import { createAsync } from "@solidjs/router";
import { Match, Suspense, Switch, type VoidComponent } from "solid-js";
import RecentPostsList from "~/components/RecentPostsList";
import { injectIsAdmin } from "~/injectors/injectIsAdmin.server";

const Edit: VoidComponent = () => {
  const isAdminQuery = createAsync(injectIsAdmin, {
    deferStream: true,
  });

  return (
    <Container>
      <Paper class="py-base min-h-dvh">
        <Suspense
          fallback={<LoadingFallback center>Loading...</LoadingFallback>}
        >
          <Switch>
            <Match when={!isAdminQuery()?.isAdmin}>
              <p>You are not authorized to access this page</p>
            </Match>
            <Match when={isAdminQuery()?.isAdmin}>
              <h1 class="text-2xl font-bold text-orange-300">Manage posts</h1>
              <RecentPostsList class="mt-6" buildPostHref={buildPostHref} />
            </Match>
          </Switch>
        </Suspense>
      </Paper>
    </Container>
  );

  function buildPostHref(post: Post) {
    return `/posts/${post.id}/edit`;
  }
};

export default Edit;
