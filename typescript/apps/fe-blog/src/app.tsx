import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import GlobalLayout from "~/components/GlobalLayout";
import { GlobalProvider } from "~/providers/GlobalProvider";
import RootProvider from "~/providers/RootProvider";

import "~/styles/globals-base.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        // TODO: Add loading component
        <Suspense fallback={<div>Loading...</div>}>
          <RootProvider>
            <GlobalProvider>
              <GlobalLayout>{props.children}</GlobalLayout>
            </GlobalProvider>
          </RootProvider>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
