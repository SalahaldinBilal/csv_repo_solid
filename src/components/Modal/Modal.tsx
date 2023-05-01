import styles from "./Modal.module.scss";
import { Transition } from "solid-transition-group";
import { createMemo, JSX, Show } from "solid-js";
import { ModalProps } from "../../types";
import Button from "../Button/Button";
import { Close } from "@suid/icons-material";

function Modal(props: ModalProps) {
  const width = createMemo(() => {
    if (props.width !== undefined) {
      return typeof props.width === 'string' ? props.width : `${props.width}px`
    }

    return undefined
  })

  const height = createMemo(() => {
    if (props.height !== undefined) {
      return typeof props.height === 'string' ? props.height : `${props.height}px`
    }

    return undefined
  })

  const extraStyles = createMemo(() => {
    const obj: JSX.CSSProperties = {}
    if (width() != undefined) obj.width = width();
    if (height() != undefined) obj.height = height();
    return obj;
  })

  return (
    <Transition
      onBeforeEnter={(el) => el.classList.add(styles.StartState, styles.EnterAnimation)}
      onEnter={async (el, done) => el.addEventListener("animationend", done)}
      onAfterEnter={(el) => el.classList.remove(styles.StartState, styles.EnterAnimation)}
      onBeforeExit={(el) => el.classList.add(styles.EndAnimation)}
      onExit={(el, done) => el.addEventListener("animationend", done)}
    >
      <Show when={props.show}>
        <div class={styles.Container} onClick={() => props.onHide?.()}>
          <div class={styles.Body} style={extraStyles()} onClick={event => event.stopPropagation()}>
            <div class={styles.Header}>
              {props.title ?? ""}
              <div class={styles.Close}>
                <Button
                  isIcon
                  onClick={props.onHide?.()}
                >
                  <Close />
                </Button>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      </Show>
    </Transition>
  );
}

export default Modal;
