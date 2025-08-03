import ConditionalLink from "@packages/ui/components/ConditionalLink";
import Modal from "@packages/ui/components/Modal";
import { useLocation } from "@packages/ui/hooks/useLocation";
import { VoidComponent } from "solid-js";
import GoogleSignInIcon from "~/icons/GoogleSignInIcon";
import { configs } from "~/utils/config";

const SignInModal: VoidComponent<{
  class?: string;
  visible: boolean;
  onClose: () => void;
}> = (props) => {
  const location = useLocation();

  return (
    <Modal
      title="🐶 Let's sign in"
      size="sm"
      visible={props.visible}
      onClose={props.onClose}
    >
      <ConditionalLink
        class="mt-4"
        href={`${configs.BLOG_API_URL}/auth/google?redirect=${location()?.href}`}
        target="_self"
      >
        <GoogleSignInIcon class="mx-auto mt-8" />
      </ConditionalLink>
      <p class="mx-auto mt-3 text-center text-sm text-zinc-400">
        I do not collect your personal information!.. 🐶
      </p>
    </Modal>
  );
};

export default SignInModal;
