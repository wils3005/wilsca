import * as Zod from "zod";

type LogLevel = Zod.infer<typeof Config.LogLevel>;

class Config {
  static LogLevel = Zod.enum(["trace", "debug", "info", "warn", "error"]);

  static globalName = globalThis.constructor.name;

  log(msg: unknown, level: LogLevel = "debug"): void {
    console[level]({
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
