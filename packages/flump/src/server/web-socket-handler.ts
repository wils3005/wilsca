import * as uuid from "uuid";
import { FastifyRequest } from "fastify";
import { SocketStream } from "fastify-websocket";
import { Message } from "../shared/message";

class WebSocketHandler {
  static readonly all = new Map<string, WebSocketHandler>();

  connection: SocketStream;

  request: FastifyRequest;

  id = uuid.v4();

  constructor(connection: SocketStream, request: FastifyRequest) {
    this.connection = connection;
    this.request = request;

    this.connection.socket.on("close", () => {
      WebSocketHandler.all.delete(this.id);
    });

    this.connection.socket.on("error", () => {
      WebSocketHandler.all.delete(this.id);
    });

    this.connection.socket.on("message", (x) => {
      try {
        Message.parse(x);
      } catch {
        this.connection.socket.emit("error");
      }
    });

    this.connection.socket.on("open", () => null);
    this.connection.socket.on("ping", () => this.connection.socket.pong());
    WebSocketHandler.all.set(this.id, this);
  }
}

export { WebSocketHandler };
