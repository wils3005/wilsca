import * as Zod from "zod";
import { DBNames, LogLevel } from "./enums";

class BaseApplication {
  bcName = "broadcast-channel-1";
  bc = new BroadcastChannel(this.bcName);
  className = "BaseApplication";
  databases = new Map<DBNames, IDBDatabase>();
  globalName = globalThis.constructor.name;

  constructor() {
    this.bc.onmessage = (ev) => this.log(ev);
    this.bc.onmessageerror = (ev) => this.log(ev);
    Object.values(DBNames).forEach((v) => this.setDB(v));
    this.log("constructor");
  }

  log(msg?: unknown, level = LogLevel.DEBUG): void {
    console[level](this.globalName, this.className, msg);
  }

  setDB(dbName: DBNames): void {
    this.log("setDB");
    const req = globalThis.indexedDB.open(dbName);
    req.onblocked = (ev) => this.log(ev, LogLevel.WARN);
    req.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    req.onsuccess = (ev) => {
      this.log(ev);
      const db = Zod.instanceof(IDBOpenDBRequest).parse(ev.target).result;
      db.onabort = (ev) => this.log(ev, LogLevel.WARN);
      db.onclose = (ev) => this.log(ev);
      db.onerror = (ev) => this.log(ev, LogLevel.ERROR);
      db.onversionchange = (ev) => this.log(ev);
      this.databases.set(dbName, db);
    };

    req.onupgradeneeded = (ev) => {
      this.log(ev);
      this.databases.set(
        dbName,
        Zod.instanceof(IDBOpenDBRequest).parse(ev.target).result
      );
    };
  }
}

export default BaseApplication;
