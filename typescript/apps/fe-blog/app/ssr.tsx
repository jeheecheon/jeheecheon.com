import { createRouter } from "@/router";
import { getRouterManifest } from "@tanstack/solid-start/router-manifest";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/solid-start/server";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
