import "./game";
import { log } from "./log";

function onWindowLoad(): void {
  log();
}

globalThis.addEventListener("load", onWindowLoad);

export { onWindowLoad };
