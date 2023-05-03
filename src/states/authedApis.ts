import { createRoot } from "solid-js";
import userData from "./userData";
import { until } from "@solid-primitives/promise";

function snackbarManager() {
  const { data } = userData;
  const url = "https://2wv0130qig.execute-api.us-east-2.amazonaws.com/dev";

  function getAuthHeader(extraHeaders: Params = {}): Headers {
    const token = data.session?.getIdToken().getJwtToken()
    const headers = new Headers();
    if (token)
      headers.set("Authorization", token);

    for (const [key, value] of Object.entries(extraHeaders))
      headers.set(key, value);

    return headers;
  }

  function appendQueryParameters(path: string, queryParameters: { [key: string]: string }) {
    const queryParamsString = (new URLSearchParams(queryParameters ?? {})).toString();
    if (queryParamsString.length) return path + `?${queryParamsString}`;
    return path
  }

  async function waitForToken() {
    await until(() => data.session != undefined);
  }

  type Params = { [key: string]: string };

  async function deleteRequest(path: string, extraHeaders: Params = {}, queryParameters: Params = {}) {
    await waitForToken();
    path = appendQueryParameters(url + path, queryParameters ?? {});

    return await fetch(path, {
      method: "DELETE",
      headers: getAuthHeader(extraHeaders)
    })
  }

  async function getRequest(path: string, extraHeaders: Params = {}, queryParameters: Params = {}) {
    await waitForToken();
    path = appendQueryParameters(url + path, queryParameters ?? {});

    return await fetch(path, {
      method: "GET",
      headers: getAuthHeader(extraHeaders)
    })
  }

  async function postRequest(path: string, body: BodyInit, extraHeaders: Params = {}, queryParameters: Params = {}) {
    await waitForToken();
    path = appendQueryParameters(url + path, queryParameters ?? {});

    return await fetch(path, {
      method: "POST",
      body,
      headers: getAuthHeader(extraHeaders)
    })
  }

  return {
    getRequest,
    deleteRequest,
    postRequest
  };
}

export default createRoot(snackbarManager);