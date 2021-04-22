import * as zod from "zod";
import Pino from "pino";

type LogLevel = zod.infer<typeof Config.LogLevel>;

class Config {
  static LogLevel = zod.enum(["trace", "debug", "info", "warn", "error"]);

  static pino = Pino({
    level: "debug",
  });

  static globalName = globalThis.constructor.name;

  log(msg: unknown, level: LogLevel = "debug"): void {
    Config.pino[level]({
      globalName: Config.globalName,
      name: this.constructor.name,
      msg,
    });
  }

  constructor() {
    this.log("constructor");
  }
}

export { Config };
