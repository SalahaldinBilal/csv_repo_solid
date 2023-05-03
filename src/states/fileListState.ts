import { createRoot, createSignal, onMount } from "solid-js";
import { createStore, reconcile, unwrap } from "solid-js/store";
import { CsvFileData } from "../types";
import authedApis from "./authedApis";
import { createTimer } from "@solid-primitives/timer";
import snackbarManager from "./snackbarManager";

function fileListState() {
  const cacheKey = "fileList";
  const [csvFileList, setCsvFileList] = createStore<CsvFileData[]>([]);
  const [fileListLoading, setFileListLoading] = createSignal(false);
  const { getRequest, deleteRequest, postRequest } = authedApis;
  const { addMessage } = snackbarManager;

  createTimer(() => {
    localStorage.setItem(cacheKey, JSON.stringify(unwrap(csvFileList)))
  }, 5000, setInterval)

  onMount(() => {
    const storedValue = localStorage.getItem(cacheKey) as string;

    try {
      const data = JSON.parse(storedValue);
      setCsvFileList(data);
    } catch (e) {
      setCsvFileList([]);
    }
  })

  async function loadCsvFileList() {
    setFileListLoading(true);
    const response = await getRequest("/csv");
    const data: CsvFileData[] = await response.json();
    setCsvFileList(reconcile(data, { key: "name", merge: true }));
    setFileListLoading(false);
  }

  async function handleError(response: Response) {
    for (let entry of response.headers.entries()) {
      console.log(entry);
    }
    console.log(response.headers.get("x-amzn-errortype"), Array.from(response.headers.keys()), response);
    if (response.status >= 400) {
      if (response.headers.get("x-amzn-errortype") == 'UnauthorizedException')
        return addMessage('Unauthorized')

      return addMessage(`Error while uploading file: ${await response.text()}`, 'error')
    }
  }

  async function downloadFile(response: Response, fileName: string) {
    const fileData = await response.blob();
    const url = URL.createObjectURL(fileData);

    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    URL.revokeObjectURL(url);
  }

  return {
    csvFileList,
    loadCsvFileList,
    fileListLoading,
    downloadFile: async (name: string) => {
      try {
        addMessage(`Starting download of ${name}.`, 'information');

        const response = await getRequest(`/csv/${encodeURIComponent(name)}`)
        await downloadFile(response, name);

        addMessage(`Downloaded ${name} successfully.`, 'success');
      } catch (e) {
        addMessage(`Unexpected error while trying to download file: ${e}`, 'error');
      }
    },
    downloadFileAsJson: async (name: string) => {
      try {
        addMessage(`Starting download of ${name} JSON.`, 'information');

        const response = await getRequest(`/json/${encodeURIComponent(name)}`)
        await downloadFile(response, name + ".json");
        addMessage(`Downloaded ${name} JSON successfully.`, 'success');
      } catch (e) {
        addMessage(`Unexpected error while trying to download file: ${e}`, 'error');
      }
    },
    deleteFile: async (name: string) => {
      try {
        const response = await deleteRequest(`/csv/${encodeURIComponent(name)}`);

        if (response.status >= 400) return handleError(response);
        setCsvFileList(reconcile(csvFileList.filter(e => e.name !== name, { key: "name", merge: true })));
      } catch (e) {
        addMessage(`Unexpected error while trying to download file: ${e}`, 'error');
      }
    },
    uploadFile: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await postRequest(`/csv`, formData, { 'Content-Type': 'multipart/form-data' });

        if (response.status >= 400) return handleError(response);
        loadCsvFileList();
      } catch (e) {
        addMessage(`Unexpected error while trying to download file: ${e}`, 'error');
      }
    }
  };
}

export default createRoot(fileListState);