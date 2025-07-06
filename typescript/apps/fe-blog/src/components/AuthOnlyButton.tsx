import Button from "~/components/Button";
import withSignedIn from "~/enhancers/withSignedIn";

const AuthOnlyButton = withSignedIn(Button);

export default AuthOnlyButton;
