import * as Zod from "zod";
import Base, { LogLevel } from "./base";

enum DBNames {
  DB1 = "db1",
}

class DatabaseManager extends Base {
  static all = new Map<DBNames, DatabaseManager>();

  static init(): Map<DBNames, DatabaseManager> {
    Object.values(DBNames).forEach((s) => new DatabaseManager(s));
    return DatabaseManager.all;
  }

  dbName: DBNames;
  db?: IDBDatabase;
  request?: IDBOpenDBRequest;

  constructor(dbName: DBNames) {
    super();
    this.dbName = dbName;
    this.handleRequest(globalThis.indexedDB.open(this.dbName));
  }

  handleRequest(request: IDBOpenDBRequest): void {
    request.onblocked = (ev) => this.log(ev, LogLevel.WARN);
    request.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    request.onsuccess = (ev) => this.handleSuccess(ev);
    request.onupgradeneeded = () => this.handleUpgradeNeeded();
    this.request = request;
  }

  // (this: IDBRequest<IDBDatabase>, ev: Event) => any)
  handleSuccess(event: Event): void {
    this.log("handleSuccess");
    this.db = Zod.instanceof(IDBOpenDBRequest).parse(event.target).result;
    this.db.onabort = (ev) => this.log(ev, LogLevel.WARN);
    this.db.onclose = (ev) => this.log(ev);
    this.db.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    this.db.onversionchange = (ev) => this.log(ev);
    DatabaseManager.all.set(this.dbName, this);
  }

  // ((this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => any)
  handleUpgradeNeeded(): void {
    this.log("handleUpgradeNeeded");
    DatabaseManager.all.set(this.dbName, this);
  }
}

export default DatabaseManager;
export { DBNames };
