import styles from "./FileList.module.scss";
import Button from "../../components/Button/Button";
import fileListState from "../../states/fileListState";
import Table from "../../components/Table/Table";
import { formatSize, toLocalString } from "../../helpers";
import { DataArray, Delete, Download, Refresh } from "@suid/icons-material";
import { createSignal, batch, onMount } from "solid-js";
import PageTop from "../../components/PageTop/PageTop";
import FileListUploadModal from "./FileListUploadModal/FileListUploadModal";

function FileList() {
  const { csvFileList, loadCsvFileList, downloadFile, deleteFile, uploadFile, fileListLoading, downloadFileAsJson } = fileListState;
  let fileUploadInput: HTMLInputElement;
  onMount(loadCsvFileList)

  const [showModal, setShowModal] = createSignal(false);
  const [fileName, setFileName] = createSignal("");
  const [fileToUpload, setFileToUpload] = createSignal<File>();

  const onInput = (event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement; }) => {
    const file: File | undefined = event.target.files![0];
    if (!file) return;

    batch(() => {
      setShowModal(true);
      setFileName(file.name);
      setFileToUpload(() => file);
    })
  }

  const onUploadOk = async () => {
    await uploadFile(fileToUpload()!);
    setShowModal(false);
  }

  return (
    <>
      <div class="page-container">
        <PageTop loading={fileListLoading()} end={
          <Button isIcon children={<Refresh />} onClick={loadCsvFileList} />
        }>
          <input type="file" ref={fileUploadInput!} style={{ display: 'none' }} onChange={onInput} />
          <Button
            onClick={() => fileUploadInput.click()}
            noRadius
            style={{ height: "100%" }}
          >
            Upload File
          </Button>
          <FileListUploadModal
            show={showModal()}
            fileName={fileName()}
            onClose={() => setShowModal(false)}
            onOk={onUploadOk}
          />
        </PageTop>
        <Table
          isStyled
          data={csvFileList}
          headers={{
            "Name": data => data.name,
            "Size": {
              display: data => `${formatSize(data.size)}`,
              style: { "min-width": "90px", "text-align": "center" }
            },
            "Last Modified": {
              display: data => toLocalString(data.lastUpdate),
              style: { "min-width": "100px", "text-align": "center" }
            },
            "Options": {
              display: data => <>
                <Button isIcon children={<Download />} onClick={() => downloadFile(data.name)} />
                <Button isIcon children={<Delete />} onClick={() => deleteFile(data.name)} />
                <Button isIcon children={<DataArray />} onClick={() => downloadFileAsJson(data.name)} />
              </>,
              style: { "min-width": "90px", "text-align": "center" }
            }
          }}
        />
      </div>
    </>
  );
}

export default FileList;
