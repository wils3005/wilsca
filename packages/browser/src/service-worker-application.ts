import BaseApplication from "./base-application";
import { LogLevel } from "./enums";

class ServiceWorkerApplication extends BaseApplication {
  className = "ServiceWorkerApplication";
  ws: WebSocket | null = null;
  wsURL = "ws://localhost:8080";

  constructor() {
    super();
    this.setWS();
  }

  setWS(): void {
    this.log("setWS");
    this.ws = new WebSocket(this.wsURL);
    this.ws.onclose = (ev) => this.log(ev);
    this.ws.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    this.ws.onmessage = (ev) => this.log(ev);
    this.ws.onopen = (ev) => this.log(ev);
  }
}

new ServiceWorkerApplication();
