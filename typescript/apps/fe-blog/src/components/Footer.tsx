import ConditionalLink from "@packages/ui/components/ConditionalLink";
import Container from "@packages/ui/components/Container";
import Paper from "@packages/ui/components/Paper";
import { cn } from "@packages/ui/utils/class-name";
import { VoidComponent } from "solid-js";
import { configs } from "~/utils/config";

const Footer: VoidComponent<{ class?: string }> = (props) => {
  return (
    <footer class={cn("", props.class)}>
      <Container>
        <Paper class="border-t border-zinc-800 py-15">
          <ConditionalLink
            class="block text-center text-sm text-zinc-400 hover:text-orange-300"
            href={`mailto:${configs.EMAIL}`}
          >
            jeheecheon@gmail.com
          </ConditionalLink>
          <p class="mt-2 text-center text-sm text-zinc-400">
            Copyright 2025 Jehee Cheon. All rights reserved.
          </p>
        </Paper>
      </Container>
    </footer>
  );
};

export default Footer;
