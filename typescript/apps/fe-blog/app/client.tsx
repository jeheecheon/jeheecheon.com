/// <reference types="vinxi/types/client" />

import { createRouter } from "@fe-blog/router";
import { StartClient } from "@tanstack/solid-start";
import { hydrate } from "solid-js/web";

const router = createRouter();

hydrate(() => <StartClient router={router} />, document.body);
