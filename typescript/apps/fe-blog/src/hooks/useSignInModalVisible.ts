import { useGlobalState } from "./useGlobalState";

export const useSignInModalVisible = () => {
  const { signInModalVisible } = useGlobalState();

  return signInModalVisible;
};
