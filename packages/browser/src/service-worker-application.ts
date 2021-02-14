import { LogLevel } from "./enums";

class ServiceWorkerApplication {
  ws: WebSocket | null = null;
  wsURL = "ws://localhost:8080";

  constructor() {
    this.setWS();
    this.logger("constructor");
  }

  logger(msg: unknown, level = LogLevel.DEBUG): void {
    console[level](globalThis.constructor.name, this.constructor.name, msg);
  }

  setWS(): void {
    this.logger("setWS");
    this.ws = new WebSocket(this.wsURL);
    this.ws.onclose = (ev) => this.logger(ev);
    this.ws.onerror = (ev) => this.logger(ev, LogLevel.ERROR);
    this.ws.onmessage = (ev) => this.logger(ev);
    this.ws.onopen = (ev) => this.logger(ev);
  }
}

export default ServiceWorkerApplication;
