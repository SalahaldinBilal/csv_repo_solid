import { createSignal } from "solid-js";
import styles from "./SignUpVerificationModal.module.scss";
import Button from "../../../components/Button/Button";
import Input from '../../../components/Input/Input';
import userData from "../../../states/userData";
import Modal from "../../../components/Modal/Modal";
import Legend from "../../../components/Legend/Legend";

function SignUpVerificationModal() {
  const { signUpVerification, verifySignUp } = userData;
  const [code, setCode] = createSignal("");

  const onButtonClick = () => {
    verifySignUp(signUpVerification.username, code());
  }

  return (
    <Modal
      title="Verify Email"
      show={signUpVerification.showPopup}
    >
      <Legend
        title="Verification Code"
        style={{ width: "100%", height: "100% ", "overflow-y": "auto" }}
      >
        <Input
          borderless
          selectOnClick
          style={{ "min-width": "500px" }}
          value={code()}
          onChange={event => setCode(event.currentTarget.value)}
          afterInput={
            <Button disabled={code().length < 1} onClick={onButtonClick}>
              Verify
            </Button>
          }
          inputStyle={{
            width: "30px"
          }}
        />
      </Legend>
    </Modal>
  );
}

export default SignUpVerificationModal;
