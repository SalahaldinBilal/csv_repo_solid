import styles from "./Accordion.module.scss";
import { AccordionProps } from "../../types";
import { createSignal } from "solid-js";
import Fa from "solid-fa";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

function Accordion(props: AccordionProps) {
  const [isOpen, setIsOpen] = createSignal(false);
  let timeoutId: NodeJS.Timeout;
  let panelHtml: HTMLDivElement | null;

  return (
    <div classList={{ [styles.Container]: true, [styles.Active]: isOpen() }}>
      <div
        class={styles.Title}
        onClick={() => {
          const newValue = !isOpen();

          if (newValue) {
            panelHtml!.style.maxHeight = 'unset';
            clearTimeout(timeoutId);
          } else timeoutId = setTimeout(() => {
            panelHtml!.style.maxHeight = '0px';
          }, 200);


          props.onToggle?.(newValue);
          setIsOpen(newValue);
        }}
      >
        <span>{props.title}</span>
        <div class={styles.Icon}><Fa icon={faCircleArrowUp} /></div>
      </div>
      <div class={styles.Panel} ref={panelHtml!}>
        {props.children}
      </div>
    </div>
  );
}

export default Accordion;
