import Button from "@packages/ui/components/Button";
import Modal from "@packages/ui/components/Modal";
import { cn } from "@packages/ui/utils/class-name";
import { ParentComponent } from "solid-js";

const ConfirmModal: ParentComponent<{
  class?: string;
  title: string;
  visible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}> = (props) => {
  return (
    <Modal
      class={cn("", props.class)}
      title={props.title}
      size="sm"
      visible={props.visible}
      onClose={props.onClose}
    >
      {props.children}

      <div class="mt-5 flex items-center justify-end gap-x-3">
        <Button theme="secondary" size="sm" onClick={props.onClose}>
          Cancel
        </Button>
        <Button theme="primary" size="sm" onClick={props.onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
