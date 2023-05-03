import { createRoot, createSignal } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { UserData } from "../types";
import snackbarManager from "./snackbarManager";
import jwtDecode from "jwt-decode";
import { Auth } from "aws-amplify";
import type { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";

function useUserData() {
  const [data, setUserData] = createStore<UserData>({ username: "", loggedIn: false, session: undefined });
  const [loginLoading, setLoginLoading] = createSignal(false);
  const [signUpVerification, setSignUpVerification] = createStore<{ showPopup: boolean, email: string, username: string }>({
    showPopup: false,
    email: "",
    username: ""
  });
  const { addMessage } = snackbarManager;

  async function checkLoginToken() {
    try {
      const user: CognitoUser = await Auth.currentAuthenticatedUser();
      const session: CognitoUserSession = await Auth.currentSession();

      setUserData({
        loggedIn: true,
        username: user.getUsername(),
        session
      });
    } catch (error) {
      if (data.loggedIn)
        addMessage(`Unknown error while trying to authenticate user`, "error");

      setUserData({
        loggedIn: false,
        username: "",
        session: undefined
      });
    }
  }


  return {
    data,
    signUpVerification,
    loginLoading,
    checkLoginToken,
    signUp: async (username: string, password: string, email: string) => {
      const result = await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email
        },
      });

      setSignUpVerification({
        showPopup: true,
        email: result.codeDeliveryDetails.Destination,
        username
      });

      addMessage(`Verification email sent to ${result.codeDeliveryDetails.Destination}`, "success");
    },
    verifySignUp: async (username: string, code: string) => {
      try {
        await Auth.confirmSignUp(username, code);

        setSignUpVerification({
          showPopup: false,
          email: "",
          username: ""
        });

        addMessage(`Verification successful, enter from login form.`, "success");
      } catch (e) {
        addMessage(`Error while verifying: ${e}`, "error")
      }
    },
    signIn: async (username: string, password: string) => {
      try {
        setLoginLoading(true);
        const user: CognitoUser = await Auth.signIn({ username, password });
        const session: CognitoUserSession = await Auth.currentSession();

        setUserData({
          loggedIn: true,
          username: user.getUsername(),
          session
        });
      } catch (error) {
        addMessage(`Login issue: ${error}`, "error");
      }

      setLoginLoading(false);
    },
    signOut: async () => {
      await Auth.signOut();

      setUserData({
        loggedIn: false,
        username: "",
        session: undefined
      });
    }
  };
}

export default createRoot(useUserData);