import styles from "./Input.module.scss";
import { InputProps } from "../../types";
import { createMemo, createSignal, JSX, Show } from "solid-js";
import { createColors } from "../../helpers";
import { destructure } from "@solid-primitives/destructure";

function Input(props: InputProps) {
  const [focused, setFocused] = createSignal(false);
  const [lastInputValue, setLastInputValue] = createSignal(props.value?.toString() ?? "");
  const disallowEmpty = createMemo(() => props.disallowEmpty ?? false)
  const selectOnClick = createMemo(() => props.selectOnClick ?? false)
  const borderless = createMemo(() => props.borderless ?? false)
  const disabled = createMemo(() => props.disabled ?? false)
  const type = createMemo(() => props.type ?? "text")
  const textAlignment = createMemo(() => props.alignText ?? "left")
  const color = createMemo(() => props.color ?? '#90caf9');
  const noRadius = createMemo(() => props.noRadius ?? false);
  const flipColors = createMemo(() => props.flipColors ?? false);
  const placeholder = createMemo(() => props.placeholder ?? "");
  const { borderColor } = destructure(() => createColors(color()))
  const style = createMemo(() => {
    const userStyles: JSX.CSSProperties = props.style ?? {};
    const usedBorderColor = flipColors() ? color() : borderColor();
    const usedBorderFocusedColor = flipColors() ? borderColor() : color();

    return {
      '--border-color': usedBorderColor,
      '--border-color-focused': usedBorderFocusedColor,
      "border-radius": noRadius() ? "0px" : "5px",
      "border-width": borderless() ? "0px" : "1px",
      ...userStyles
    }
  })
  const inputStyle = createMemo(() => {
    const userStyles: JSX.CSSProperties = props.inputStyle ?? {};
    const usedBorderColor = flipColors() ? color() : borderColor();
    const usedBorderFocusedColor = flipColors() ? borderColor() : color();

    const inputStyle: JSX.CSSProperties = {
      '--border-color': usedBorderColor,
      '--border-color-focused': usedBorderFocusedColor,
      'border-radius': noRadius() ? "0px" : "5px",
      "text-align": textAlignment(),
      ...userStyles
    }

    return inputStyle;
  })


  return (
    <div
      classList={{ [styles.Input]: true, [styles.Focused]: focused(), [styles.Disabled]: disabled() }}
      style={style()}
      onClick={event => {
        if (disabled()) event.stopPropagation();
      }}
    >
      {props.beforeInput}
      <input
        placeholder={placeholder()}
        disabled={disabled()}
        onClick={event => {
          if (selectOnClick())
            event.currentTarget.select();
          props.onClick?.(event);
        }}
        min={props.min}
        max={props.max}
        value={props.value ?? ""}
        style={inputStyle()}
        type={type()}
        onFocus={_ => setFocused(true)}
        onBlur={_ => setFocused(false)}
        onInput={event => {
          const currentValue = event.currentTarget.value;
          if (
            (props.min !== undefined && +currentValue < +props.min!) ||
            (props.max !== undefined && +currentValue > +props.max!) ||
            (disallowEmpty() && currentValue.length === 0)
          ) {
            event.currentTarget.value = lastInputValue();
            return;
          }

          setLastInputValue(event.currentTarget.value)
          props.onChange?.(event)
        }}
      />
      {props.afterInput}
    </div>
  );
}

export default Input;
