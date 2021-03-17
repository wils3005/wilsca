import "./app.css";
import "./favicon.ico";
import "./index.html";
import { Config } from "../../shared/config";
import { WebSocketManager } from "../ws-manager";
import { ServiceWorkerManager } from "./sw-manager";

class WindowApp {
  config: Config;

  log: typeof Config.prototype.log;

  swManager: ServiceWorkerManager;

  wsManager: WebSocketManager;

  constructor(config: Config) {
    this.config = config;
    this.log = config.log.bind(this);
    this.swManager = new ServiceWorkerManager(config);
    this.wsManager = new WebSocketManager(config);
    this.log("constructor");
  }
}

export { WindowApp };
