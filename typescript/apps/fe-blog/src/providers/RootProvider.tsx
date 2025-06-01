import { ParentComponent } from "solid-js";
import TanstackQueryProvider from "~/providers/TanstackQueryProvider";

const RootProvider: ParentComponent = (props) => {
  return <TanstackQueryProvider>{props.children}</TanstackQueryProvider>;
};

export default RootProvider;
