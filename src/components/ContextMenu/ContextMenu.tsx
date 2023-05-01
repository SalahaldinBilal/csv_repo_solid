import styles from "./ContextMenu.module.scss";
import { ContextMenuMenuId, Pos } from "../../types";
import { JSX, Show, createSignal } from "solid-js";
import { calculateContextMenuPosition, clickOutside } from "../../helpers";
import { contextMenuEventHandler } from "./eventHandler";
import { Transition } from "solid-transition-group";
clickOutside;

function ContextMenu(props: { id: ContextMenuMenuId, children: JSX.Element, styles?: JSX.CSSProperties }) {
  const [isOpen, setIsOpen] = createSignal(false);
  const [position, setPosition] = createSignal<Pos>({ x: 0, y: 0 });
  let containerRef: HTMLDivElement;

  contextMenuEventHandler.on("show", (params) => {
    if (params.id !== props.id) return;

    params.event.preventDefault();
    setIsOpen(true);
    setPosition(
      params.position ??
      calculateContextMenuPosition(
        { x: params.event.clientX, y: params.event.clientY },
        { width: containerRef?.offsetWidth, height: containerRef?.offsetHeight }
      )
    );
  })

  contextMenuEventHandler.on("hideAll", () => {
    contextMenuEventHandler.emit("hide", props.id)
  })

  contextMenuEventHandler.on("hide", (id) => {
    if (id !== props.id) return;

    setIsOpen(false);
  })

  return (
    <Transition
      onBeforeEnter={(el) => el.classList.add(styles.StartState, styles.EnterAnimation)}
      onEnter={async (el, done) => el.addEventListener("animationend", done)}
      onAfterEnter={(el) => el.classList.remove(styles.StartState, styles.EnterAnimation)}
      onBeforeExit={(el) => el.classList.add(styles.EndAnimation)}
      onExit={(el, done) => el.addEventListener("animationend", done)}
    >
      <Show when={isOpen()}>
        <div
          ref={containerRef!}
          class={styles.Container}
          use:clickOutside={() => contextMenuEventHandler.emit("hide", props.id)}
          style={{ ...(props.styles ?? {}), left: position().x + "px", top: position().y + "px" }}
        >
          {props.children}
        </div>
      </Show>
    </Transition>
  );
}

export default ContextMenu;
