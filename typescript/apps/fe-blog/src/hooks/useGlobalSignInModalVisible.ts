import { useGlobalState } from "./useGlobalState";

export const useGlobalSignInModalVisible = () => {
  const { signInModalVisible } = useGlobalState();

  return signInModalVisible;
};
