import BaseComponent from "./base-component";
import { LogLevel } from "./enums";

class ServiceWorkerContainerComponent extends BaseComponent {
  static readonly SW_URL = "app.js";

  container = globalThis.navigator.serviceWorker;

  constructor() {
    super();
    this.container.oncontrollerchange = (ev) =>
      this.logger("handleControllerChange");

    this.container.onmessage = (ev) => this.logger("handleMessage");
    this.container.onmessageerror = (ev) =>
      this.logger("handleMessageError", LogLevel.ERROR);

    void this.container
      .register(ServiceWorkerContainerComponent.SW_URL)
      .then((registration) => this.handleRegistration(registration))
      .catch((r) => this.logger(r, LogLevel.ERROR));
  }

  handleRegistration(registration: ServiceWorkerRegistration): void {
    this.logger("handleRegistration");
    registration.onupdatefound = (ev) => this.logger("handleUpdateFound");
    registration
      .update()
      .catch((r) => this.logger("handleError", LogLevel.ERROR));

    const serviceWorker =
      registration.installing ?? registration.waiting ?? registration.active;

    if (!serviceWorker) return;

    serviceWorker.onstatechange = (ev) => this.logger("handleStateChange");
    serviceWorker.onerror = (ev) => this.logger("handleError", LogLevel.ERROR);
  }
}

export default ServiceWorkerContainerComponent;
