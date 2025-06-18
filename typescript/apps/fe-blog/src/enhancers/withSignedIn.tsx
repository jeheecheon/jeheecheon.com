import { Component } from "solid-js";
import toast from "solid-toast";
import { Props as ButtonProps } from "~/components/Button";
import { useAccount } from "~/hooks/useAccount";
import { useGlobalSignInModalVisible } from "~/hooks/useGlobalSignInModalVisible";
import { EventOf } from "~/types/misc";

function withSignedIn<T extends ButtonProps>(WrappedComponent: Component<T>) {
  return function WithSignedIn(props: T) {
    const [globalSignInModalVisible, setGlobalSignInModalVisible] =
      useGlobalSignInModalVisible();
    const account = useAccount();

    return (
      <WrappedComponent
        {...props}
        loading={
          props.loading || account.isPending || globalSignInModalVisible()
        }
        onClick={handleClick}
      />
    );

    function handleClick(event: EventOf<HTMLButtonElement, MouseEvent>) {
      if (!account.data?.account) {
        event.preventDefault();

        setGlobalSignInModalVisible(true);
        toast.error("Please sign in to continue");
        return;
      }

      if (typeof props.onClick === "function") {
        props.onClick(event);
      }
    }
  };
}

export default withSignedIn;
