import { createRoot, createSignal } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { AuthResponse, UserData } from "../types";
import snackbarManager from "./snackbarManager";
import jwtDecode from "jwt-decode";

function useUserData() {
  const [data, setUserData] = createStore<UserData>({ username: "", loggedIn: false });
  const [loginLoading, setLoginLoading] = createSignal(false)
  const { addMessage } = snackbarManager;

  const changeUserData = (newUserData: Partial<UserData>) => {
    const newData = { ...data, ...newUserData };
    setUserData(reconcile(newData))
  }

  return {
    data,
    loginLoading,
    signIn: async (username: string, password: string) => {
      try {
        setLoginLoading(true);
        const response = await fetch("https://mp80qvcgud.execute-api.us-east-2.amazonaws.com/prod/login", {
          method: "POST",
          // credentials: "include",
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            username: username,
            password: password
          })
        });

        if (response.status < 400) {
          const authData: AuthResponse = await response.json();

          console.log(jwtDecode(authData.access_token));
          console.log(jwtDecode(authData.id_token));
          console.log(jwtDecode(authData.refresh_token));

          changeUserData({
            username,
            loggedIn: true,
            authData: authData
          });
        }
        else addMessage(`Login issue: ${await response.text()}`, "error");


        setLoginLoading(false);
      } catch (error) {
        addMessage(`Unknown error while trying to log in`, "error");
        setLoginLoading(false);
      }
    },
    checkLoginToken: async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API}/api/isAuth`, {
          credentials: 'include'
        });

        if (response.status >= 400) {
          if (!data.loggedIn) return;
          addMessage(`Failed to authenticate user`, "error");
          changeUserData({
            username: "",
            loggedIn: false,
          })
        } else {
          const reqData: { message: string, username: string } = await response.json();
          setUserData({
            username: reqData.username,
            loggedIn: true
          })
        }
      } catch (error) {
        console.error(error)
        addMessage(`Unknown error while trying to authenticate user`, "error");
      }
    }
  };
}

export default createRoot(useUserData);