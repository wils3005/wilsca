import { LogLevel } from "./enums";
import Pino from "pino";

class BaseComponent {
  static BROADCAST_CHANNEL_NAME = "broadcast-channel-1";

  bc = new BroadcastChannel(BaseComponent.BROADCAST_CHANNEL_NAME);
  pino = Pino({
    browser: { asObject: true },
    level: "debug",
  });

  constructor() {
    this.logger("constructor");
    this.bc.onmessage = (ev) => this.logger(ev);
    this.bc.onmessageerror = (ev) => this.logger(ev);
  }

  logger(msg: unknown, level = LogLevel.DEBUG): void {
    this.pino[level]({
      globalName: globalThis.constructor.name,
      name: this.constructor.name,
      msg,
    });
  }
}

export default BaseComponent;
