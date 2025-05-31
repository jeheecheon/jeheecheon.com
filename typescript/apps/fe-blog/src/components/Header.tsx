import { moon, sun } from "solid-heroicons/solid";
import {
  createSignal,
  For,
  Match,
  Switch,
  type ParentComponent,
  type VoidComponent,
} from "solid-js";
import ConditionalLink from "~/components/ConditionalLink";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import PresenceTransition from "~/components/PresenceTransition";
import { cn } from "~/utils/class-name";

const links = [
  {
    label: "Home",
    href: "//jeheecheon.com",
  },
  {
    label: "Resume",
    href: "//resume.jeheecheon.com",
  },
  {
    label: "Blog",
    href: "/",
    isActive: true,
  },
];

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

const Header: VoidComponent<{ class?: string }> = (props) => {
  const [theme, setTheme] = createSignal<Theme>(Theme.DARK);

  return (
    <div
      class={cn(
        "flex w-full items-center justify-between md:px-14",
        props.class,
      )}
    >
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
                    "text-sm font-medium text-stone-300 transition-colors duration-300 hover:underline hover:underline-offset-4",
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
  );

  function handleToggleTheme(theme?: Theme) {
    return () => {
      setTheme((prev) => {
        if (prev === Theme.LIGHT) {
          alert("Light theme is not available yet");
        }

        return theme ?? (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
      });
    };
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
