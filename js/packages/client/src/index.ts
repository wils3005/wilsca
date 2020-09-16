import App from "./App";
import ReactDOM from "react-dom";
import log from "./log";

addEventListener("load", handleLoad);

export function handleLoad(): void {
  log();
  ReactDOM.render(App(), document.getElementById("root"));
}
