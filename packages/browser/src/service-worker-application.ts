import BaseApplication from "./base-application";

class ServiceWorkerApplication extends BaseApplication {
  className = "ServiceWorkerApplication";

  container: ServiceWorkerContainer | null = null;
  registration: ServiceWorkerRegistration | null = null;
  worker: ServiceWorker | null = null;

  scriptURL = "./js/main.js";

  constructor() {
    super();
    globalThis.addEventListener("load", () => this.setContainer());
    this.log("constructor");
  }

  setContainer(): void {
    this.log("setContainer");
    this.container = navigator.serviceWorker;
    this.container.oncontrollerchange = (e) => this.log(e);
    this.container.onmessage = (e) => this.log(e);
    this.container.onmessageerror = (e) => this.log(e);

    void this.container
      .register(this.scriptURL)
      .then((r) => this.setRegistration(r))
      .catch((m) => this.log(m));
  }

  setRegistration(r: ServiceWorkerRegistration): void {
    this.log("setRegistration");
    this.registration = r;
    r.onupdatefound = (e) => this.log(e);

    const worker =
      this.registration.installing ??
      this.registration.waiting ??
      this.registration.active;

    if (worker) this.setWorker(worker);
  }

  setWorker(w: ServiceWorker): void {
    this.log("setWorker");
    this.worker = w;
    this.worker.addEventListener("statechange", (e) => this.log(e));
    this.worker.addEventListener("error", (e) => this.log(e, "error"));
  }
}

export default ServiceWorkerApplication;
