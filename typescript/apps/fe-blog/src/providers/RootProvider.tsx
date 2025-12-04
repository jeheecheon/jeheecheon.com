import { ParentComponent } from "solid-js";
import { GlobalProvider } from "~/providers/GlobalProvider";
import TanstackQueryProvider from "~/providers/TanstackQueryProvider";

const RootProvider: ParentComponent = (props) => {
  return (
    <TanstackQueryProvider>
      <GlobalProvider>{props.children}</GlobalProvider>
    </TanstackQueryProvider>
  );
};

export default RootProvider;
