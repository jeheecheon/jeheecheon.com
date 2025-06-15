import { Account } from "@packages/common/types/blog/account";
import { Nullable } from "@packages/common/types/misc";
import { QueryObserverResult } from "@tanstack/solid-query";
import { createContext, createSignal, ParentComponent, Signal } from "solid-js";
import { useAccount } from "~/hooks/useAccount";

type GlobalContextType = {
  signInModalVisible: Signal<boolean>;
  account: QueryObserverResult<{ account: Account }>;
};

export const GlobalContext = createContext<Nullable<GlobalContextType>>(null);

export const GlobalProvider: ParentComponent = (props) => {
  const signInModalVisible = createSignal(false);
  const account = useAccount();

  return (
    <GlobalContext.Provider value={{ signInModalVisible, account }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
