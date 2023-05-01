import { createTimer } from "@solid-primitives/timer";
import { createMemo, createRoot } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { SnackbarMessage, SnackbarType } from "../types";

function snackbarManager() {
  const [snackMessages, setSnackMessages] = createStore<SnackbarMessage[]>([])
  const delay = createMemo(() => snackMessages.length ? 1000 : false);

  createTimer(() => {
    const filteredList = snackMessages.filter(message => message.startTime + message.duration > Date.now())
    setSnackMessages(reconcile(filteredList, { key: "id", merge: true }))
  }, delay, setInterval)

  const addMessage = (content: string, type: SnackbarType = "information", duration: number = 5000) => {
    const ids = new Uint32Array(1);
    window.crypto.getRandomValues(ids);
    const id = ids[0];

    setSnackMessages(list => [...list, { id, startTime: Date.now(), content, type, duration }])
  }

  const removeMessage = (id: number) => {
    setSnackMessages(list => list.filter(e => e.id !== id))
  }

  return {
    snackMessages,
    addMessage,
    removeMessage
  };
}

export default createRoot(snackbarManager);