import { Props as ButtonProps } from "@packages/ui/components/Button";
import { EventOf } from "@packages/ui/types/misc";
import { Component } from "solid-js";
import toast from "solid-toast";
import { useAccount } from "~/hooks/useAccount";
import { useGlobalSignInModalVisible } from "~/hooks/useGlobalSignInModalVisible";

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
