import App from "./App";
import ReactDOM from "react-dom";
import log from "./log";

if (globalThis.constructor.name == "Window") {
  globalThis.addEventListener("load", handleLoad);
}

export function handleLoad(): void {
  log();
  ReactDOM.render(App(), globalThis.document.getElementById("root"));
}
