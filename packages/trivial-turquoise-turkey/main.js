import "./sw.js";
import { log } from "./consoleLogger.js";

function onWindowLoad() {
  log();
}

globalThis.addEventListener("load", onWindowLoad);

export { onWindowLoad };
