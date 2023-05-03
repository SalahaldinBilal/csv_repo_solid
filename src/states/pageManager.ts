import { createEffect, createRoot, createSignal, on, onMount } from "solid-js";
import { AppPage } from "../types";
import userDataStore from "./userData";
import { CloudDownloadOutlined, ListOutlined } from "@suid/icons-material";
import snackbarManager from "./snackbarManager";

function pageManager() {
  const { data: userData } = userDataStore;
  const { addMessage } = snackbarManager;
  const pageList = [
    { name: "Login", route: "/login", disabled: () => userData.loggedIn, iconComponent: ListOutlined },
    { name: "Main Page", route: "/", disabled: () => !userData.loggedIn, iconComponent: CloudDownloadOutlined },
  ] as const satisfies readonly AppPage[];

  const [selectedPage, setSelectedPage] = createSignal<AppPage>(pageList[0]);
  const [pageOrder, setPageOrder] = createSignal<Array<typeof pageList[number]["route"]>>([
    "/"
  ]);

  onMount(() => {
    const storedData = localStorage.getItem("pageOrder")

    if (!storedData?.length) return;

    try {
      const parsedStoredData: Array<typeof pageList[number]["route"]> = JSON.parse(storedData);
      setPageOrder(parsedStoredData)
    } catch (err) {
      addMessage("Failed to parse cached downloaded list data.")
    }
  })

  createEffect(on([pageOrder], ([pageOrder]) => {
    localStorage.setItem("pageOrder", JSON.stringify(pageOrder))
  }, { defer: true }))

  return {
    pageList,
    pageOrder,
    setPageOrder,
    selectedPage,
    selectPage: (route: (typeof pageList)[number]["route"]) => {
      const newPage = pageList.filter(e => e.route === route)[0];
      setSelectedPage(newPage);
    }
  };

}
export default createRoot(pageManager);