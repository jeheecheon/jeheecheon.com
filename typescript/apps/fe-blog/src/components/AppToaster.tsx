import { VoidComponent } from "solid-js";
import { Toaster } from "solid-toast";

const AppToaster: VoidComponent = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "var(--color-zinc-800)",
          color: "var(--color-zinc-300)",
        },
      }}
    />
  );
};

export default AppToaster;
