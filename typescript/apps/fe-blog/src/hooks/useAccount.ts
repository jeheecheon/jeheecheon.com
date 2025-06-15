import { useQuery } from "@tanstack/solid-query";
import { createClientSignal } from "solid-use/client-only";
import { injectAccount, InjectAccountArgs } from "~/injectors/injectAccount";

export const useAccount = (argsFn: () => InjectAccountArgs = () => ({})) => {
  const { id, email } = argsFn();

  const isClient = createClientSignal();

  const query = useQuery(() => ({
    queryKey: ["account", id, email],
    queryFn: () => injectAccount({ id, email }),
    enabled: isClient(),
  }));

  return query;
};
