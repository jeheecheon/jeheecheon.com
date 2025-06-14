import { assert } from "@packages/common/utils/assert";
import { useContext } from "solid-js";
import { GlobalContext } from "~/providers/GlobalProvider";

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  assert(context, "Must be called within a GlobalProvider");

  return context;
};
