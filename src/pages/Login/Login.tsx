import { createSignal } from "solid-js";
import styles from "./Login.module.scss";
import Button from "../../components/Button/Button";
import Input from '../../components/Input/Input';
import { AuthResponse } from "../../types";
import userData from "../../states/userData";


function Login() {
  const { signIn, loginLoading } = userData;
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  return (
    <div class={styles.Container}>
      <div class={styles.LoginModule}>
        <Input
          alignText='center'
          disabled={loginLoading()}
          value={username()}
          onChange={event => setUsername(event.currentTarget.value)}
        />
        <Input
          alignText='center'
          type='password'
          disabled={loginLoading()}
          value={password()}
          onChange={event => setPassword(event.currentTarget.value)}
        />
        <Button
          onClick={() => signIn(username(), password())}
          disabled={loginLoading()}
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
