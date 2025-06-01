import { ParentComponent } from "solid-js";
import { Toaster } from "solid-toast";
import TanstackQueryProvider from "~/providers/TanstackQueryProvider";

const RootProvider: ParentComponent = (props) => {
  return (
    <TanstackQueryProvider>
      {props.children}
      <Toaster />
    </TanstackQueryProvider>
  );
};

export default RootProvider;
