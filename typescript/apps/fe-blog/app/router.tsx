import { routeTree } from "@fe-blog/routeTree.gen";
import { createRouter as createTanStackRouter } from "@tanstack/solid-router";

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
  });

  return router;
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
