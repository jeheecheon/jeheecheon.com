import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import GlobalLayout from "~/components/GlobalLayout";
import RootProvider from "~/providers/RootProvider";

import "~/styles/globals-base.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        // TODO: Add loading component
        <Suspense fallback={<div>Loading...</div>}>
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
