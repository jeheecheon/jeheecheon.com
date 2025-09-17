import Paper from "@packages/ui/components/Paper";
import { cn } from "@packages/ui/utils/class-name";
import { ParentComponent } from "solid-js";
import Heading from "~/components/Heading";

const Resume: ParentComponent<{ class?: string }> = (props) => {
  return (
    <Paper class={cn("", props.class)}>
      <Heading type="h1">{`안녕하세요,\n저는 천제희입니다`}</Heading>
    </Paper>
  );
};

export default Resume;
