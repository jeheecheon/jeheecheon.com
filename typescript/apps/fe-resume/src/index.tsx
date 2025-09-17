/* @refresh reload */
import { ensure } from "@packages/common/utils/assert";
import { render } from "solid-js/web";
import App from "~/App";

const root = document.getElementById("root");
render(() => <App />, ensure(root, "Root element not found"));
