import "./app.css";
import "./favicon.ico";
import "./index.html";
import ServiceWorkerComponent from "./service-worker-component";
import WindowComponent from "./window-component";

let app;

switch (globalThis.constructor.name) {
  case "ServiceWorkerGlobalScope":
    app = new ServiceWorkerComponent();
    break;
  case "Window":
    app = new WindowComponent();
    break;
  default:
    throw "oh no";
}

Object.assign(globalThis, { app });

export {};
