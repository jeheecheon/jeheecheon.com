import Button from "~/components/Button";
import withSignedIn from "~/enhancers/WithSignedIn";

const AuthOnlyButton = withSignedIn(Button);

export default AuthOnlyButton;
