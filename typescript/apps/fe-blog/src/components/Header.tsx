import { RoleId } from "@packages/common/types/blog/role";
import Button from "@packages/ui/components/Button";
import ConditionalLink from "@packages/ui/components/ConditionalLink";
import Container from "@packages/ui/components/Container";
import Icon from "@packages/ui/components/Icon";
import Image from "@packages/ui/components/Image";
import PresenceTransition from "@packages/ui/components/PresenceTransition";
import { useLocation } from "@packages/ui/hooks/useLocation";
import { cn } from "@packages/ui/utils/class-name";
import { useNavigate } from "@solidjs/router";
import { moon, sun } from "solid-heroicons/solid";
import {
  createSignal,
  For,
  Match,
  Show,
  Suspense,
  Switch,
  type ParentComponent,
  type VoidComponent,
} from "solid-js";
import AuthOnlyButton from "~/components/AuthOnlyButton";
import { useAccount } from "~/hooks/useAccount";
import { AppUrlBuilder } from "~/utils/url";

const links = [
  {
    label: "Home",
    href: AppUrlBuilder.home(),
    isActive: true,
  },
  {
    label: "Resume",
    href: AppUrlBuilder.resume(),
  },
];

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const Header: VoidComponent<{ class?: string }> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = createSignal<Theme>(Theme.DARK);

  const accountQuery = useAccount();

  return (
    <div class={cn("", props.class)}>
      <Container>
        <div class="xs:justify-between flex w-full items-center justify-center gap-x-6 md:px-20">
          <Image
            class="not-xs:hidden size-14 rounded-full outline-1 outline-offset-4 transition-all duration-200 hover:scale-105 hover:outline-offset-2 hover:outline-orange-400 dark:outline-orange-300"
            src="/images/profile.png"
            alt="logo"
          />

          <section class="group/nav-box w-fit rounded-full px-5 py-2 outline-1 transition-all duration-200 dark:bg-zinc-800 dark:outline-offset-4 dark:outline-orange-300 dark:hover:outline-offset-2 dark:hover:outline-orange-400">
            <ul class="flex items-center gap-4">
              <For each={links}>
                {(link) => (
                  <li>
                    <ConditionalLink
                      class={cn(
                        "text-sm font-medium text-stone-400 transition-colors duration-300 hover:text-white hover:underline-offset-4",
                        link?.isActive &&
                          "font-semibold dark:text-orange-300 dark:group-hover/nav-box:text-orange-400",
                      )}
                      href={link.href}
                    >
                      {link.label}
                    </ConditionalLink>
                  </li>
                )}
              </For>

              <Suspense>
                <Show
                  when={accountQuery.isSuccess}
                  fallback={
                    <AuthOnlyButton theme="secondary" size="xs">
                      Sign In
                    </AuthOnlyButton>
                  }
                >
                  <>
                    <Show
                      when={accountQuery.data?.account?.roles?.some(
                        (role) => role.id === RoleId.ADMIN,
                      )}
                    >
                      <li class="border-l border-l-zinc-700 pl-3 not-md:hidden">
                        <Button
                          theme="secondary"
                          size="xs"
                          onClick={handleAdminClick}
                        >
                          Admin
                        </Button>
                      </li>
                    </Show>
                    <li class="border-l border-l-zinc-700 pl-3">
                      <a href={AppUrlBuilder.signOut()}>
                        <Button theme="secondary" size="xs">
                          Sign-out
                        </Button>
                      </a>
                    </li>
                  </>
                </Show>
              </Suspense>
            </ul>
          </section>

          <PresenceTransition transitionKey={theme()} option="enterFromTop">
            <Switch>
              <Match when={theme() === Theme.LIGHT}>
                <ThemeButton onClick={handleToggleTheme(Theme.DARK)}>
                  <Icon class="size-full" path={sun} />
                </ThemeButton>
              </Match>
              <Match when={theme() === Theme.DARK}>
                <ThemeButton onClick={handleToggleTheme(Theme.LIGHT)}>
                  <Icon class="size-full" path={moon} />
                </ThemeButton>
              </Match>
            </Switch>
          </PresenceTransition>
        </div>
      </Container>
    </div>
  );

  function handleToggleTheme(theme?: Theme) {
    return () => {
      setTheme((prev) => {
        if (theme === Theme.LIGHT || prev === Theme.DARK) {
          alert("Light theme is not supported yet 👀");
        }

        return theme ?? (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
      });
    };
  }

  function handleAdminClick() {
    const pathname = location()?.pathname;
    const postId = pathname?.match(/posts\/([a-f0-9-]+)/)?.[1];

    const href = postId
      ? AppUrlBuilder.adminPost({ id: postId })
      : AppUrlBuilder.adminPosts();

    navigate(href);
  }
};

const ThemeButton: ParentComponent<{
  class?: string;
  onClick: () => void;
}> = (props) => {
  return (
    <button
      class={cn(
        "size-9 rounded-full p-2 shadow-lg shadow-black/70 outline-1 outline-offset-4 transition-all duration-300 hover:scale-125 hover:rotate-12 dark:bg-zinc-900 dark:text-orange-200 dark:outline-orange-300 dark:hover:outline-offset-0 dark:hover:outline-orange-400",
        props.class,
      )}
      onClick={handleClick}
    >
      {props.children}
    </button>
  );

  function handleClick() {
    props.onClick();
  }
};

export default Header;
