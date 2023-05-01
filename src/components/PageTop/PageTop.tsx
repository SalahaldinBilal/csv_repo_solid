import styles from "./PageTop.module.scss";
import { JSX, Show } from "solid-js";
import { LinearProgress } from "@suid/material";

function PageTop(props: { children: JSX.Element, loading?: boolean, end?: JSX.Element, sticky?: boolean }) {
  return (
    <div class={styles.Top} classList={{ [styles.Sticky]: props.sticky ?? false }}>
      {props.children}
      <Show when={props.end != undefined}>
        <div class={styles.LeftSpace} />
        {props.end}
      </Show>
      <Show when={props.loading}>
        <LinearProgress sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }} />
      </Show>
    </div>
  );
}

export default PageTop;
