import styles from "./ContextMenuItem.module.scss";
import { Show, createMemo } from "solid-js";
import Fa from "solid-fa";
import { contextMenuEventHandler } from "../eventHandler";
import { ContextMenuItemProps } from "../../../types";

function ContextMenuItem(props: ContextMenuItemProps) {
  const disabled = createMemo(() => props.disabled ?? false);
  const shouldCloseOnClick = createMemo(() => props.shouldCloseOnClick ?? !disabled());

  return (
    <div
      class={styles.Container}
      onClick={ev => {
        props.onClick?.(ev);
        if (shouldCloseOnClick()) contextMenuEventHandler.emit("hideAll");
      }}
    >
      <Show when={props.icon}>
        <span class={styles.Icon}>
          <Fa icon={props.icon!} scale={1.25} />
        </span>
      </Show>
      {props.children}
    </div>
  );
}

export default ContextMenuItem;
