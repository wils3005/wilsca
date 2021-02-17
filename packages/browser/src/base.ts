import Pino from "pino";

enum LogLevel {
  TRACE = "trace",
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}
abstract class Base {
  static BROADCAST_CHANNEL_NAME = "broadcast-channel-1";

  bc = new BroadcastChannel(Base.BROADCAST_CHANNEL_NAME);
  pino = Pino({
    browser: { asObject: true },
    level: "debug",
  });

  constructor() {
    this.log("constructor");
    this.bc.onmessage = (ev) => this.log(ev);
    this.bc.onmessageerror = (ev) => this.log(ev);
  }

  log(msg: unknown, level = LogLevel.DEBUG): void {
    this.pino[level]({
      globalName: globalThis.constructor.name,
      name: this.constructor.name,
      msg,
    });
  }
}

export default Base;
export { LogLevel };
