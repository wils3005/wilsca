import App from "./App";
import ReactDOM from "react-dom";
import { register } from "./MyServiceWorker";

addEventListener("load", () => {
  ReactDOM.render(App(), document.getElementById("root"));
  void register();
});
