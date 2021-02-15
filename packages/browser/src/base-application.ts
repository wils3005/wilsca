import * as Zod from "zod";
import { DBNames, LogLevel } from "./enums";

class BaseApplication {
  BROADCAST_CHANNEL_NAME = "broadcast-channel-1";

  bc: BroadcastChannel | null = null;
  databases = new Map<DBNames, IDBDatabase>();

  constructor() {
    this.setBC();
    Object.values(DBNames).forEach((v) => this.setDB(v));
    this.logger("constructor");
  }

  logger(msg: unknown, level = LogLevel.DEBUG): void {
    console[level](globalThis.constructor.name, this.constructor.name, msg);
  }

  setBC(): void {
    this.bc = new BroadcastChannel(this.BROADCAST_CHANNEL_NAME);
    this.bc.onmessage = (ev) => this.logger(ev);
    this.bc.onmessageerror = (ev) => this.logger(ev);
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

export default BaseApplication;
