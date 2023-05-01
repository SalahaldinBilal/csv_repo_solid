import styles from "./Table.module.scss";
import { TableProps } from "../../types";
import { createMemo, For, Show } from "solid-js";

function Table<T = any>(props: TableProps<T>) {
  const headerNames = createMemo(() => Object.keys(props.headers));
  const hideHeaders = createMemo(() => props.hideHeaders ?? false);
  const isStyled = createMemo(() => props.isStyled ?? false);
  const disableSticky = createMemo(() => props.disableSticky ?? false);

  return (
    <table classList={{ [styles.Table]: true, [styles.Styled]: isStyled(), [styles.NoSticky]: disableSticky() }}>
      <Show when={!hideHeaders()}>
        <thead>
          <tr>
            <For each={headerNames()}>{header => <th>{header}</th>}</For>
          </tr>
        </thead>
      </Show>
      <tbody>
        <For each={props.data}>{dataPoint =>
          <tr>
            <For each={headerNames()}>{header => {
              const currentHeaderOptions = props.headers[header];
              const func = typeof currentHeaderOptions === "function" ? currentHeaderOptions : currentHeaderOptions.display;
              const style = typeof currentHeaderOptions === "function" ? {} : currentHeaderOptions.style ?? {};

              return <td style={style}>{func(dataPoint)}</td>
            }}</For>
          </tr>
        }</For>
      </tbody>
    </table>
  );
}

export default Table;
