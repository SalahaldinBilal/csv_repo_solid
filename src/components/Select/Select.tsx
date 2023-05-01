import styles from "./Select.module.scss";
import { SelectProps } from "../../types";
import Input from "../Input/Input";
import ContextMenu from "../ContextMenu/ContextMenu";
import ContextMenuItem from "../ContextMenu/ContextMenuItem/ContextMenuItem";
import { useContextMenu } from "../ContextMenu/useContextMenu";
import { For, JSX, createMemo, createSignal } from "solid-js";
import { createColors } from "../../helpers";
import { destructure } from "@solid-primitives/destructure";

function Select<T>(props: SelectProps<T>) {
  const { show: showContextMenu, id: menuId } = useContextMenu();
  const [isFocused, setIsFocused] = createSignal(false);
  const currentValue = createMemo(() => props.value);
  const color = createMemo(() => props.color ?? '#90caf9');
  const { borderColor } = destructure(() => createColors(color()))
  const borderless = createMemo(() => props.borderless ?? false);
  const noRadius = createMemo(() => props.noRadius ?? false);
  const flipColors = createMemo(() => props.flipColors ?? false);
  const style = createMemo(() => {
    const userStyles: JSX.CSSProperties = props.style ?? {};
    const usedBorderColor = flipColors() ? color() : borderColor();
    const usedBorderFocusedColor = flipColors() ? borderColor() : color();

    return {
      '--border-color': usedBorderColor,
      '--border-color-focused': usedBorderFocusedColor,
      "border-radius": noRadius() ? "0px" : "5px",
      "border-width": borderless() ? "0px" : "1px",
      ...userStyles,
    }
  })

  return (
    <>
      <div
        tabIndex={0}
        style={style()}
        class={styles.Select}
        classList={{ [styles.Focused]: isFocused() }}
        onClick={event => {
          event.preventDefault();
          const currElem = event.currentTarget;
          currElem.focus();
          console.log(currElem)
          showContextMenu(event);
        }}
        onFocusIn={() => setIsFocused(true)}
        onFocusOut={() => setIsFocused(false)}
      >
        {props.items.find(e => e.id === currentValue())?.label ?? "Unknown Value"}
      </div>
      <ContextMenu id={menuId} styles={{ "max-height": "300px" }}>
        <For each={props.items}>{item =>
          <ContextMenuItem
            onClick={() => {
              props.onItemClick(item);
            }}
          >
            {item.label}
          </ContextMenuItem>
        }</For>
      </ContextMenu>
    </>
  );
}

export default Select;