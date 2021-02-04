import "./main.css";
import "./peer";
import "./emoji-match";
import log from "./log";

function onLoad(): void {
  log();
}

function onResize(): void {
  log();
}

globalThis.addEventListener("load", onLoad);
globalThis.addEventListener("resize", onResize);

export { onLoad, onResize };
