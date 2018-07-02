import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./app/constants/firebaseConfig";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";
import {
  checkBrowserCompatibility,
  getBrowserDetails
} from "./app/common/util/browserDetails";
import { browser_config } from "./app/constants/browserRequirement";
import AlertDialog from "./app/common/AlertDialog";
import "./index.css";

const currentBrowserDetails = getBrowserDetails();

const browser = checkBrowserCompatibility(
  browser_config,
  currentBrowserDetails
);
const data = {
  title: "Error",
  content: "Please Install the lastest version",
  browserName: currentBrowserDetails.name,
  version: currentBrowserDetails.version
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
//browser[0] returns object if condition satisfies otherwise return undefine
//!!( "! operator" twice) converts the value to the right of it to its equivalent boolean value
ReactDOM.render(
  !!browser[0] ? <App /> : <AlertDialog data={data} />,
  document.getElementById("root")
);
registerServiceWorker();
