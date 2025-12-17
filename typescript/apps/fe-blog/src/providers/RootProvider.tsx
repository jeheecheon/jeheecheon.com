import { MetaProvider } from "@solidjs/meta";
import { ParentComponent } from "solid-js";
import { GlobalProvider } from "~/providers/GlobalProvider";
import TanstackQueryProvider from "~/providers/TanstackQueryProvider";

const RootProvider: ParentComponent = (props) => {
  return (
    <MetaProvider>
      <TanstackQueryProvider>
        <GlobalProvider>{props.children}</GlobalProvider>
      </TanstackQueryProvider>
    </MetaProvider>
  );
};

export default RootProvider;
