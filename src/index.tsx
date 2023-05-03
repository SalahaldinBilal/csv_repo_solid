/* @refresh reload */
import { render } from "solid-js/web";
import { Amplify } from 'aws-amplify';
import "./style.css";
import App from "./App";
import { Router } from "@solidjs/router";
//@ts-ignore
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

render(() => <Router><App /></Router>, document.getElementById("root") as HTMLElement);