import "./app.css";
import "./favicon.ico";
import "./index.html";
import * as Zod from "zod";
import { Config, Message } from "../shared";

class Browser {
  static readonly WS_URL = "ws://localhost:8080";

  clusters = Zod.instanceof(HTMLSelectElement).parse(
    globalThis.document.querySelector("#clusters")
  );

  config: Config;

  log: typeof Config.prototype.log;

  webSocket: WebSocket;

  constructor(config = new Config()) {
    this.config = config;
    this.log = config.log.bind(this);
    this.webSocket = this.create();
    this.log("constructor");
  }

  create(): WebSocket {
    this.log("create");
    const webSocket = new WebSocket(Browser.WS_URL);
    webSocket.onclose = () => this.close();
    webSocket.onerror = () => this.error();
    webSocket.onmessage = (x) => this.message(x);
    webSocket.onopen = () => this.open();
    return webSocket;
  }

  close(): void {
    this.log("close");
  }

  error(): void {
    this.log("error", "error");
    this.webSocket.close();
  }

  message(event: MessageEvent<unknown>): void {
    this.log("message");

    try {
      const message = Message.parse(event.data);
      if (message.clusters) {
        while (this.clusters.firstChild) {
          this.clusters.removeChild(this.clusters.firstChild);
        }

        message.clusters.forEach((cluster) => {
          const element = globalThis.document.createElement("option");
          element.value = cluster;
          element.innerHTML = cluster;
          this.clusters.appendChild(element);
        });
      }
    } catch (e) {
      this.log(e, "error");
    }
  }

  open(): void {
    this.log("open");
  }

  send(msg: Message): void {
    this.log("send");
    this.webSocket.send(msg.toString());
  }
}

Object.assign(globalThis, { app: new Browser() });

export { Browser };
