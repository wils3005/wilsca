import * as Zod from "zod";
import Base, { LogLevel } from "./base";

enum DBNames {
  DB1 = "db1",
}

class DatabaseManager extends Base {
  static all = new Set<DatabaseManager>();

  static init(): Set<DatabaseManager> {
    Object.values(DBNames).forEach((s) => new DatabaseManager(s));
    return DatabaseManager.all;
  }

  dbName: DBNames;
  db?: IDBDatabase;
  request?: IDBOpenDBRequest;

  constructor(dbName: DBNames) {
    super();
    this.dbName = dbName;
    this.setRequest(globalThis.indexedDB.open(this.dbName));
    DatabaseManager.all.add(this);
  }

  setRequest(request: IDBOpenDBRequest): void {
    request.onblocked = (ev) => this.log(ev, LogLevel.WARN);
    request.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    request.onsuccess = (ev) => this.success(ev);
    request.onupgradeneeded = () => this.upgradeNeeded();
    this.request = request;
  }

  // (this: IDBRequest<IDBDatabase>, ev: Event) => any)
  success(event: Event): void {
    this.log("success");
    this.db = Zod.instanceof(IDBOpenDBRequest).parse(event.target).result;
    this.db.onabort = (ev) => this.log(ev, LogLevel.WARN);
    this.db.onclose = (ev) => this.log(ev);
    this.db.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    this.db.onversionchange = (ev) => this.log(ev);
  }

  // ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any)
  upgradeNeeded(): void {
    this.log("upgradeNeeded");
  }
}

export default DatabaseManager;
export { DBNames };
