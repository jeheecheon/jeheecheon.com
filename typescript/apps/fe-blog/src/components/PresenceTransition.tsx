import {
  createMemo,
  Match,
  mergeProps,
  Show,
  Switch,
  type JSX,
  type ParentComponent,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import { Motion, Presence, type Options } from "solid-motionone";
import { cn } from "~/utils/class-name";

const optionsMap = {
  fadeInOut: {
    variants: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
    transition: { duration: 0.3, easing: "ease-in-out" },
  },
  enterFromTop: {
    variants: {
      hidden: { opacity: 0, transform: "translateY(-100%)" },
      visible: { opacity: 1, transform: "translateY(0)" },
      exit: { opacity: 0 },
    },
    transition: { duration: 0.2, easing: "ease-out" },
  },
} satisfies Record<string, Partial<Options>>;

const PresenceTransition: ParentComponent<{
  class?: string;
  transitionKey: string;
  option: keyof typeof optionsMap;
  as?: keyof typeof Motion;
  visible?: boolean;
  fallback?: JSX.Element;
  animateOnInitialMount?: boolean;
}> = (_props) => {
  const props = mergeProps({ visible: true }, _props);

  const AsMotion = createMemo(() => Motion[props.as ?? "div"]);

  return (
    <Presence initial={!!props.animateOnInitialMount} exitBeforeEnter>
      <Show when={props.visible} fallback={props.fallback}>
        <Switch>
          <Match when={props.transitionKey} keyed>
            <Dynamic
              class={cn("", props.class)}
              component={AsMotion()}
              initial={optionsMap[props.option].variants.hidden}
              animate={optionsMap[props.option].variants.visible}
              exit={optionsMap[props.option].variants.exit}
              variants={optionsMap[props.option].variants}
              transition={optionsMap[props.option].transition}
            >
              {props.children}
            </Dynamic>
          </Match>
        </Switch>
      </Show>
    </Presence>
  );
};

export default PresenceTransition;
