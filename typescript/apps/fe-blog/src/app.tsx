import LoadingFallback from "@packages/ui/components/LoadingFallback";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import GlobalLayout from "~/components/GlobalLayout";
import RootProvider from "~/providers/RootProvider";

import "~/styles/globals.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense fallback={<LoadingFallback center />}>
          <RootProvider>
            <GlobalLayout>{props.children}</GlobalLayout>
          </RootProvider>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
