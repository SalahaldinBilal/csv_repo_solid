import styles from "./Button.module.scss";
import { ButtonProps } from "../../types";
import { createEffect, createMemo, For, JSX } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { destructure } from "@solid-primitives/destructure";
import { createColors } from "../../helpers";

function Button(props: ButtonProps) {
  const isIconButton = createMemo(() => props.isIcon ?? false);
  const noRadius = createMemo(() => props.noRadius ?? false);
  const isFilled = createMemo(() => props.filled ?? false);
  const disabled = createMemo(() => props.disabled ?? false);
  const color = createMemo(() => props.color ?? '#90caf9');
  const { backgroundColor, rippleBackgroundColor } = destructure(() => createColors(color()))
  const style = createMemo(() => {
    const userStyles: JSX.CSSProperties = props.style ?? {};
    const buttonStyles = { ...userStyles, "---button-background-color": backgroundColor(), color: color() }
    if (isIconButton())
      buttonStyles["min-width"] = "0px"
    if (noRadius())
      buttonStyles["border-radius"] = "0px"
    if (userStyles.height)
      buttonStyles["min-height"] = "0px"

    return buttonStyles;
  })
  const [effects, setEffects] = createStore<{ id: number, dimensions: string, left: string, top: string }[]>([]);
  let buttonRef: HTMLButtonElement | null;

  createEffect(() => {
    if (disabled())
      setEffects(reconcile([], { key: "id", merge: true }))
  })

  const addRipple = (event: MouseEvent) => {
    const rect = buttonRef!.getBoundingClientRect()
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    setEffects(effects.length, {
      id: Math.floor(Date.now() * Math.random()),
      dimensions: `${diameter}px`,
      left: `${event.x - (rect.left + radius)}px`,
      top: `${event.y - (rect.top + radius)}px`
    })
  }

  const removeEffect = (id: number) => {
    setEffects(reconcile(effects.filter(e => e.id !== id), { key: "id", merge: true }))
  }

  const generateRippleStyles = (effect: { id: number, dimensions: string, left: string, top: string }) => {
    return {
      width: effect.dimensions,
      height: effect.dimensions,
      top: effect.top,
      left: effect.left,
      "background-color": rippleBackgroundColor()
    } as JSX.CSSProperties
  }

  return (
    <button
      disabled={disabled()}
      class={styles.Button}
      ref={buttonRef!}
      style={style()}
      onClick={event => {
        if (disabled()) return;
        addRipple(event)
        props.onClick?.(event)
      }}
    >
      {props.children}
      <For each={effects}>{
        effect => <span class={styles.Ripple} style={generateRippleStyles(effect)} onAnimationEnd={() => removeEffect(effect.id)} />
      }</For>
    </button>
  );
}

export default Button;
