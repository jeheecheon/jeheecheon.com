import { ParentComponent } from "solid-js";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import { cn } from "~/utils/class-name";

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
