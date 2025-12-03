export const isBrowser = () => {
  return typeof window === "object";
};

export const isServer = () => {
  return typeof window !== "object";
};
