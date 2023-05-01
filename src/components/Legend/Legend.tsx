import styles from "./Legend.module.scss";
import { LegendProps, LegendPropsWithItems } from "../../types";
import { createMemo, createSignal, For, JSX } from "solid-js";
import { destructure } from "@solid-primitives/destructure";
import { createColors } from "../../helpers";
import Button from "../Button/Button";

function arePropsWithTitle<T extends string>(props: LegendProps<T>): props is LegendPropsWithItems<T> {
  return (props as any).items !== undefined;
}

function Legend<T extends string>(props: LegendProps<T>) {
  const [focused, setFocused] = createSignal(false);
  const color = createMemo(() => props.color ?? '#90caf9');
  const { borderColor } = destructure(() => createColors(color()))
  const style = createMemo(() => {
    const userStyles: JSX.CSSProperties = props.style ?? {};
    return {
      ...userStyles,
      '--color': color(),
      '--border-color': borderColor(),
      '--border-color-focused': color(),
      "border-radius": "5px",
    }
  })

  return (
    <fieldset
      onFocusIn={() => setFocused(true)}
      onFocusOut={() => setFocused(false)}
      classList={{ [styles.Legend]: true, [styles.Focused]: focused() }}
      style={style()}
    >
      {props.children}
      <legend class={styles.Title} style={{ color: color() }}>
        {
          arePropsWithTitle(props) ? <For each={props.items}>{
            (item, index) => <>
              <Button noRadius filled={props.currentItem === item} children={item} onClick={() => props.onItemClick(item)} />
              {index() !== props.items.length - 1 ? <div class={styles.ListSeparator}></div> : ''}
            </>
          }</For> : props.title
        }
      </legend>
    </fieldset>
  );
}

export default Legend;
