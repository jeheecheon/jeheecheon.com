import { cn } from "@packages/ui/utils/class-name";
import { JSX, ParentComponent } from "solid-js";

type Props = {
  class?: string;
} & JSX.AnchorHTMLAttributes<HTMLAnchorElement>;

const ExternalLink: ParentComponent<Props> = (props) => {
  return (
    <a
      {...props}
      class={cn("", props.class)}
      target={props.target ?? "_blank"}
      rel={props.rel ?? "noopener noreferrer"}
    >
      {props.children}
    </a>
  );
};

export default ExternalLink;
