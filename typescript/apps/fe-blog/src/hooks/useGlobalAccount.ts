import { useGlobalState } from "./useGlobalState";

export const useGlobalAccount = () => {
  const { account } = useGlobalState();

  return account;
};
