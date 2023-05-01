import styles from "./SnackbarHolder.module.scss";
import { Close, ErrorOutline } from "@suid/icons-material";
import { For } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import snackbarManager from "../../states/snackbarManager";

function SnackbarHolder() {
  const { snackMessages, removeMessage } = snackbarManager;

  function titleCase(str: string) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <div class={styles.Container}>
      <TransitionGroup
        onBeforeEnter={(el) => el.classList.add(styles.Test, styles.FadingIn)}
        onEnter={async (el, done) => el.addEventListener("animationend", done)}
        onAfterEnter={(el) => el.classList.remove(styles.Test, styles.FadingIn)}
        onBeforeExit={(el) => el.classList.add(styles.FadingOut)}
        onExit={(el, done) => el.addEventListener("animationend", done)}
      >
        <For each={snackMessages}>{message => <>
          <div classList={{ [styles.Message]: true, [styles[titleCase(message.type)]]: true }}>
            <ErrorOutline sx={{ marginRight: "5px" }} class={styles.Icon} />
            <div class={styles.Content}>{message.content}</div>
            <Close sx={{ cursor: "pointer" }} class={styles.Icon} onClick={() => removeMessage(message.id)} />
          </div>
        </>}</For>
      </TransitionGroup>
    </div>
  );
}

export default SnackbarHolder;
