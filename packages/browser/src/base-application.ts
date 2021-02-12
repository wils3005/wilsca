class BaseApplication {
  globalName = globalThis.constructor.name;
  className = "BaseApplication";

  log(msg?: unknown, level: LogLevel = "debug"): void {
    console[level](this.globalName, this.className, msg);
  }
}

export default BaseApplication;
