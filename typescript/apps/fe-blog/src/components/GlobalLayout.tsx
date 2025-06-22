import { ParentComponent } from "solid-js";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import SignInModal from "~/components/SignInModal";
import { useGlobalSignInModalVisible } from "~/hooks/useGlobalSignInModalVisible";
import { cn } from "~/utils/class-name";

const GlobalLayout: ParentComponent<{ class?: string }> = (props) => {
  const [signInModalVisible, setSignInModalVisible] =
    useGlobalSignInModalVisible();

  return (
    <>
      <div class={cn("h-full", props.class)}>
        <Header class="fixed top-6 z-30 w-full" />
        {props.children}
        <Footer />
      </div>

      <SignInModal
        visible={signInModalVisible()}
        onClose={handleSignInModalClose}
      />
    </>
  );

  function handleSignInModalClose() {
    setSignInModalVisible(false);
  }
};

export default GlobalLayout;
