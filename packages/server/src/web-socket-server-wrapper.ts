import HTTPServerWrapper from "./http-server-wrapper";
import Pino from "pino";
import Session from "./session";
import WebSocket from "ws";

class WebSocketServerWrapper {
  readonly httpServer = new HTTPServerWrapper().server;
  readonly logger = Pino({ level: "debug", name: this.constructor.name });
  readonly webSocketServer = new WebSocket.Server({ server: this.httpServer });

  constructor() {
    this.logger.debug("constructor");
    this.webSocketServer.on("connection", (s) => new Session(s));
    this.webSocketServer.on("error", () => this.logger.error("error"));
    this.webSocketServer.on("headers", () => this.logger.error("headers"));
    this.webSocketServer.on("close", () => this.logger.error("close"));
  }
}

export default WebSocketServerWrapper;
