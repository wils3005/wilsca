import BaseComponent from "./base-component";
import { LogLevel } from "./enums";

class ServiceWorkerContainerComponent extends BaseComponent {
  static readonly SW_URL = "app.js";

  container = globalThis.navigator.serviceWorker;

  constructor() {
    super();
    this.container.oncontrollerchange = (ev) => this.logger(ev);
    this.container.onmessage = (ev) => this.logger(ev);
    this.container.onmessageerror = (ev) => this.logger(ev, LogLevel.ERROR);
    void this.container
      .register(ServiceWorkerContainerComponent.SW_URL)
      .then((registration) => this.handleRegistration(registration))
      .catch((r) => this.logger(r, LogLevel.ERROR));
  }

  handleRegistration(registration: ServiceWorkerRegistration): void {
    registration.onupdatefound = (ev) => this.logger(ev);
    registration.update().catch((r) => this.logger(r, LogLevel.ERROR));
    const serviceWorker =
      registration.installing ?? registration.waiting ?? registration.active;

    if (!serviceWorker) return;

    serviceWorker.onstatechange = (e) => this.logger(e);
    serviceWorker.onerror = (e) => this.logger(e, LogLevel.ERROR);
  }
}

export default ServiceWorkerContainerComponent;
