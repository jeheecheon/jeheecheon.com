import Button from "@packages/ui/components/Button";
import withSignedIn from "~/enhancers/withSignedIn";

const AuthOnlyButton = withSignedIn(Button);

export default AuthOnlyButton;
