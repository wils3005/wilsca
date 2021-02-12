import ServiceWorkerApplication from "./service-worker-application";
import WindowApplication from "./window-application";

new ServiceWorkerApplication();
if (globalThis.constructor.name == "Window") new WindowApplication();

export {};
