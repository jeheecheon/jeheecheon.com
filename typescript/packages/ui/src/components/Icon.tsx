import { Icon as _Icon } from "solid-heroicons";
import { VoidComponent, type ComponentProps } from "solid-js";
import { NoHydration } from "solid-js/web";

type Props = {
  class?: string;
} & ComponentProps<typeof _Icon>;

const Icon: VoidComponent<Props> = (props) => {
  return (
    <NoHydration>
      <_Icon class={props.class} path={props.path} />
    </NoHydration>
  );
};

export default Icon;
