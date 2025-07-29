import { MINUTE } from "@packages/common/utils/time";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { type ParentComponent } from "solid-js";

const TanstackQueryProvider: ParentComponent = (props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1 * MINUTE,
        gcTime: 5 * MINUTE,

        // FIXME: Currently, error logs are shown suggesting this option should be set to true, even though that's not necessary.
        experimental_prefetchInRender: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <SolidQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default TanstackQueryProvider;
