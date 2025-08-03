import { cn } from "@packages/ui/utils/class-name";
import { VoidComponent } from "solid-js";
import Container from "~/components/Container";
import ExternalLink from "~/components/ExternalLink";
import Paper from "~/components/Paper";

const Footer: VoidComponent<{ class?: string }> = (props) => {
  return (
    <footer class={cn("", props.class)}>
      <Container>
        <Paper class="py-15 border-t border-zinc-800">
          <ExternalLink
            class="block text-center text-sm text-zinc-400 hover:text-orange-300"
            href="mailto:jeheecheon@gmail.com"
          >
            jeheecheon@gmail.com
          </ExternalLink>
          <p class="mt-2 text-center text-sm text-zinc-400">
            Copyright 2025 Jehee Cheon. All rights reserved.
          </p>
        </Paper>
      </Container>
    </footer>
  );
};

export default Footer;
