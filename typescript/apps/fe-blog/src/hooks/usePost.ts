import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import { injectPost, InjectPostArgs } from "~/injectors/injectPost";

export const usePost = (argsFn: () => InjectPostArgs) => {
  const { id } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery(() => ({
    queryKey: ["post", id],
    queryFn: () => injectPost({ id }),
    enabled: isClient(),
  }));

  return query;
};
