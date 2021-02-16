import * as Zod from "zod";
import BaseComponent from "./base-component";
import { LogLevel } from "./enums";

enum DBNames {
  DB1 = "db1",
}

class DatabaseComponent extends BaseComponent {
  static all = new Map<DBNames, DatabaseComponent>();

  static init(): Map<DBNames, DatabaseComponent> {
    Object.values(DBNames).forEach((s) => new DatabaseComponent(s));
    return DatabaseComponent.all;
  }

  db?: IDBDatabase;
  dbName: DBNames;
  openDBRequest: IDBOpenDBRequest;

  constructor(dbName: DBNames) {
    super();
    this.dbName = dbName;
    this.openDBRequest = globalThis.indexedDB.open(this.dbName);
    this.openDBRequest.onblocked = (ev) => this.logger(ev, LogLevel.WARN);
    this.openDBRequest.onerror = (ev) => this.logger(ev, LogLevel.ERROR);
    this.openDBRequest.onsuccess = (ev) => this.handleSuccess(ev);
    this.openDBRequest.onupgradeneeded = (ev) => this.handleUpgradeNeeded(ev);
  }

  handleSuccess(event: Event): void {
    this.logger("handleSuccess");
    this.db = Zod.instanceof(IDBOpenDBRequest).parse(event.target).result;
    this.db.onabort = (ev) => this.logger(ev, LogLevel.WARN);
    this.db.onclose = (ev) => this.logger(ev);
    this.db.onerror = (ev) => this.logger(ev, LogLevel.ERROR);
    this.db.onversionchange = (ev) => this.logger(ev);
    DatabaseComponent.all.set(this.dbName, this);
  }

  handleUpgradeNeeded(event: IDBVersionChangeEvent): void {
    this.logger("handleUpgradeNeeded");
    DatabaseComponent.all.set(this.dbName, this);
  }
}

export default DatabaseComponent;
export { DBNames };
