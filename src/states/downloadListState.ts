import fuzzysort from "fuzzysort";
import { createMemo, createRoot, createSignal } from "solid-js";
import { B2FileInfo } from "../types";
import serverDownloadList from "./serverDownloadList";


function downloadListState() {
  const [filterBy, setFilterBy] = createSignal("");
  const { downloadList } = serverDownloadList;
  const filteredList = createMemo(() => fuzzysort.go<B2FileInfo>(filterBy(), downloadList.data, { key: "name", all: true }))

  return {
    filterBy,
    setFilterBy,
    filteredList
  };
}

export default createRoot(downloadListState);