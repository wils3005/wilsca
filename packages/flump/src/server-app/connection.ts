import * as UUID from "uuid";
import * as Zod from "zod";
import WebSocket from "ws";
import { Config, Message } from "../shared";

class Connection {
  static readonly all = new Map<string, Connection>();

  static getIDs(): string[] {
    return Array.from(this.all.keys());
  }

  config: Config;

  log: typeof Config.prototype.log;

  id = UUID.v4();

  webSocket: WebSocket;

  constructor(config: Config, webSocket: WebSocket) {
    this.config = config;
    this.log = config.log.bind(this);
    this.webSocket = webSocket;
    webSocket.onclose = () => this.close();
    webSocket.onerror = (x) => this.error(x);
    webSocket.onmessage = (x) => this.message(x);
    webSocket.onopen = () => this.open();

    this.send(
      new Message({
        sender: "",
        recipient: this.id,
        ids: Connection.getIDs(),
      })
    );

    Connection.all.set(this.id, this);
  }

  close(): void {
    this.log("close");
    Connection.all.delete(this.id);
  }

  error(event: WebSocket.ErrorEvent): void {
    this.log("error", "error");
    event.target.close();
    Connection.all.delete(this.id);
  }

  message(event: WebSocket.MessageEvent): void {
    const message = Message.parse(event.data);
    if (message.sender != this.id) {
      this.webSocket.emit("error");
      return;
    }

    Zod.instanceof(Connection)
      .parse(Connection.all.get(message.recipient))
      .send(message);
  }

  open(): void {
    this.log("open");
  }

  send(msg: Message): void {
    this.webSocket.send(msg.toString());
  }
}

export { Connection };
