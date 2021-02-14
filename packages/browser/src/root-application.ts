import "./app.css";
import "./favicon.ico";
import "./index.html";
import * as Zod from "zod";
import { DBNames, LogLevel } from "./enums";
import ServiceWorkerApplication from "./service-worker-application";
import WindowApplication from "./window-application";

class RootApplication {
  bcName = "broadcast-channel-1";
  bc = new BroadcastChannel(this.bcName);
  databases = new Map<DBNames, IDBDatabase>();
  swApp =
    globalThis.constructor.name == "ServiceWorkerGlobalScope"
      ? new ServiceWorkerApplication()
      : null;

  windowApp =
    globalThis.constructor.name == "Window" ? new WindowApplication() : null;

  constructor() {
    this.bc.onmessage = (ev) => this.logger(ev);
    this.bc.onmessageerror = (ev) => this.logger(ev);
    Object.values(DBNames).forEach((v) => this.setDB(v));
    this.logger("constructor");
  }

  logger(msg?: unknown, level = LogLevel.DEBUG): void {
    console[level](globalThis.constructor.name, this.constructor.name, msg);
  }

  setDB(dbName: DBNames): void {
    this.logger("setDB");
    const req = globalThis.indexedDB.open(dbName);
    req.onblocked = (ev) => this.logger(ev, LogLevel.WARN);
    req.onerror = (ev) => this.logger(ev, LogLevel.ERROR);
    req.onsuccess = (ev) => {
      this.logger(ev);
      const db = Zod.instanceof(IDBOpenDBRequest).parse(ev.target).result;
      db.onabort = (ev) => this.logger(ev, LogLevel.WARN);
      db.onclose = (ev) => this.logger(ev);
      db.onerror = (ev) => this.logger(ev, LogLevel.ERROR);
      db.onversionchange = (ev) => this.logger(ev);
      this.databases.set(dbName, db);
    };

    req.onupgradeneeded = (ev) => {
      this.logger(ev);
      this.databases.set(
        dbName,
        Zod.instanceof(IDBOpenDBRequest).parse(ev.target).result
      );
    };
  }
}

Object.assign(globalThis, { app: new RootApplication() });

export default RootApplication;
