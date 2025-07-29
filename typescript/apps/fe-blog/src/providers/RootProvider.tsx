import { ParentComponent } from "solid-js";
import { Toaster } from "solid-toast";
import { GlobalProvider } from "~/providers/GlobalProvider";
import TanstackQueryProvider from "~/providers/TanstackQueryProvider";

const RootProvider: ParentComponent = (props) => {
  return (
    <TanstackQueryProvider>
      <GlobalProvider>
        {props.children}
        <Toaster />
      </GlobalProvider>
    </TanstackQueryProvider>
  );
};

export default RootProvider;
