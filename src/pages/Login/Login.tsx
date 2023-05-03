import { Show, createSignal } from "solid-js";
import styles from "./Login.module.scss";
import Button from "../../components/Button/Button";
import Input from '../../components/Input/Input';
import userData from "../../states/userData";
import SignUpVerificationModal from "./SignUpVerificationModal/SignUpVerificationModal";

function Login() {
  const { signIn, loginLoading, signUp } = userData;
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [isLogin, setIsLogin] = createSignal(true);

  const onButton = () => {
    isLogin() ? signIn(username(), password()) : signUp(username(), password(), email());
  }

  return (
    <>
      <div class={styles.Container}>
        <div class={styles.LoginModule}>
          <Button
            onClick={() => setIsLogin(a => !a)}
            disabled={loginLoading()}
            style={{ width: "200px" }}
          >
            {isLogin() ? "Go to sign up" : "Go to login"}
          </Button>
          <Input
            placeholder="Username"
            alignText='center'
            disabled={loginLoading()}
            value={username()}
            onChange={event => setUsername(event.currentTarget.value)}
            style={{ width: "300px" }}
          />
          <Input
            placeholder="Password"
            alignText='center'
            type='password'
            disabled={loginLoading()}
            value={password()}
            onChange={event => setPassword(event.currentTarget.value)}
            style={{ width: "300px" }}
          />
          <Show when={!isLogin()}>
            <Input
              placeholder="Email"
              alignText='center'
              type='email'
              disabled={loginLoading()}
              value={email()}
              onChange={event => setEmail(event.currentTarget.value)}
              style={{ width: "300px" }}
            />
          </Show>
          <Button
            onClick={onButton}
            disabled={loginLoading()}
            style={{ width: "200px" }}
          >
            {isLogin() ? "Login" : "Sign up"}
          </Button>
        </div>
      </div>
      <SignUpVerificationModal />
    </>
  );
}

export default Login;
