import { JSX, ParentComponent } from "solid-js";
import { cn } from "~/utils/class-name";

type Props = {
  class?: string;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink: ParentComponent<Props> = (props) => {
  return (
    <a
      {...props}
      class={cn("", props.class)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
};

export default ExternalLink;
