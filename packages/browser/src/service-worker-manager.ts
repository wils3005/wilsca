import Base from "./base";
import { LogLevel } from "./enums";

class ServiceWorkerManager extends Base {
  static readonly SW_URL = "app.js";

  container?: ServiceWorkerContainer;
  registration?: ServiceWorkerRegistration;
  worker?: ServiceWorker;

  constructor() {
    super();
    this.handleContainer(globalThis.navigator.serviceWorker);
  }

  handleContainer(container: ServiceWorkerContainer): void {
    this.log("handleContainer");
    container.oncontrollerchange = () => this.log("handleControllerChange");
    container.onmessage = () => this.log("handleMessage");
    container.onmessageerror = () =>
      this.log("handleMessageError", LogLevel.ERROR);

    void container
      .register(ServiceWorkerManager.SW_URL)
      .then((registration) => this.handleRegistration(registration))
      .catch((r) => this.log(r, LogLevel.ERROR));

    this.container = container;
  }

  handleRegistration(registration: ServiceWorkerRegistration): void {
    this.log("handleRegistration");
    registration.onupdatefound = () => this.log("handleUpdateFound");
    registration.update().catch(() => this.log("handleError", LogLevel.ERROR));
    const serviceWorker =
      registration.installing ?? registration.waiting ?? registration.active;

    if (serviceWorker) this.handleWorker(serviceWorker);
    this.registration = registration;
  }

  handleWorker(worker: ServiceWorker): void {
    this.log("handleWorker");
    worker.onstatechange = () => this.log("handleStateChange");
    worker.onerror = () => this.log("handleError", LogLevel.ERROR);
    this.worker = worker;
  }
}

export default ServiceWorkerManager;
