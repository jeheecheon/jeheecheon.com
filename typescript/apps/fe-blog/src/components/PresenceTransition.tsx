import {
  Match,
  mergeProps,
  Show,
  Switch,
  type ParentComponent,
} from "solid-js";
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
  visible?: boolean;
}> = (_props) => {
  const props = mergeProps({ visible: true }, _props);

  return (
    <Presence initial={false} exitBeforeEnter>
      <Show when={props.visible}>
        <Switch>
          <Match when={props.transitionKey} keyed>
            <Motion.div
              class={cn("", props.class)}
              initial={optionsMap[props.option].variants.hidden}
              animate={optionsMap[props.option].variants.visible}
              exit={optionsMap[props.option].variants.exit}
              variants={optionsMap[props.option].variants}
              transition={optionsMap[props.option].transition}
            >
              {props.children}
            </Motion.div>
          </Match>
        </Switch>
      </Show>
    </Presence>
  );
};

export default PresenceTransition;
