import "./sw.js";
import { log } from "./log.js";

function onWindowLoad() {
  log();
}

globalThis.addEventListener("load", onWindowLoad);

export { onWindowLoad };
