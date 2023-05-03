import styles from "./FileListUploadModal.module.scss";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";

function FileListUploadModal(props: { show: boolean, fileName: string, onClose: () => any, onOk: () => any }) {
  return (
    <Modal
      show={props.show}
      title={`Are you sure you want to upload ${props.fileName}`}
      onHide={props.onClose()}
    >
      <Button onClick={props.onOk()}>
        Yes
      </Button>
      <Button onClick={props.onClose()}>
        No
      </Button>
    </Modal>
  );
}

export default FileListUploadModal;
