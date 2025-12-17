import { cn } from "@packages/ui/utils/class-name";
import { Title } from "@solidjs/meta";
import { ParentComponent } from "solid-js";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import SignInModal from "~/components/SignInModal";
import { useGlobalSignInModalVisible } from "~/hooks/useGlobalSignInModalVisible";

const GlobalLayout: ParentComponent<{ class?: string }> = (props) => {
  const [signInModalVisible, setSignInModalVisible] =
    useGlobalSignInModalVisible();

  return (
    <>
      <Title>jeheecheon</Title>

      <div class={cn("h-full", props.class)}>
        <Header class="fixed top-3 z-30 w-full md:top-6" />
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
