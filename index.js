import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { config } from "./credentials/firebaseCredentials";
import firebase from "@firebase/app";
import "@firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

AppRegistry.registerComponent(appName, () => App);
