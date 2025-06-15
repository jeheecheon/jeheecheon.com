import { Nullable } from "@packages/common/types/misc";
import { createContext, createSignal, ParentComponent, Signal } from "solid-js";

type GlobalContextType = {
  signInModalVisible: Signal<boolean>;
};

export const GlobalContext = createContext<Nullable<GlobalContextType>>(null);

export const GlobalProvider: ParentComponent = (props) => {
  const signInModalVisible = createSignal(false);

  return (
    <GlobalContext.Provider value={{ signInModalVisible }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
