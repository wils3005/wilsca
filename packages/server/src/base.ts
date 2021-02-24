import Pino from "pino";

enum LogLevel {
  TRACE = "trace",
  DEBUG = "debug",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

class Base {
  readonly pino = Pino({ level: "debug", name: this.constructor.name });

  constructor() {
    this.log("constructor");
  }

  log(msg: unknown, level = LogLevel.DEBUG): void {
    this.pino[level]({ msg });
  }
}

export default Base;
export { LogLevel };
