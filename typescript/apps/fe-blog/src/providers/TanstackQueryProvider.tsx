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
        experimental_prefetchInRender: true,
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
