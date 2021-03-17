import { Config } from "../shared";
import { BroadcastChannelManager } from "./bc-manager";
import { DatabaseManager } from "./db-manager";
import { ServiceWorkerApp } from "./sw-app";
import { WindowApp } from "./window-app";

class BrowserApp {
  config: Config;

  log: typeof Config.prototype.log;

  bcManager: BroadcastChannelManager;

  dbManager: DatabaseManager;

  windowApp?: WindowApp;

  swApp?: ServiceWorkerApp;

  constructor(config: Config) {
    this.config = config;
    this.log = config.log.bind(this);
    this.bcManager = new BroadcastChannelManager(config);
    this.dbManager = new DatabaseManager(config);

    switch (Config.globalName) {
      case "ServiceWorkerGlobalScope":
        import("./sw-app")
          .then((x) => this.setServiceWorkerApp(x))
          .catch((x) => this.log(x));

        break;
      case "Window":
        import("./window-app")
          .then((x) => this.setWindowApp(x))
          .catch((x) => this.log(x));

        break;
      default:
        throw new Error("oh no");
    }

    this.log("constructor");
  }

  setServiceWorkerApp(mod: typeof import("./sw-app")): void {
    this.log("setServiceWorkerApp");
    this.swApp = new mod.ServiceWorkerApp(this.config);
  }

  setWindowApp(mod: typeof import("./window-app")): void {
    this.log("setWindowApp");
    this.windowApp = new mod.WindowApp(this.config);
  }
}

Object.assign(globalThis, { app: new BrowserApp(new Config()) });

export { BrowserApp };
