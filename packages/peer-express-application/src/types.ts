import Client from "./classes/client";
import ClientMessage from "./schemas/client-message";
import EventEmitter from "events";
import Express from "express";
import WS from "ws";

interface Handler {
  (client: Client | undefined, message: ClientMessage): boolean;
}

interface PeerExpressApplication extends Express.Express {
  on(event: string, callback: (...args: Express.Express[]) => void): this;
  on(event: "connection", callback: (client: Client) => void): this;
  on(event: "disconnect", callback: (client: Client) => void): this;
  on(
    event: "message",
    callback: (client: Client, message: ClientMessage) => void
  ): this;
  on(event: "error", callback: (error: Error) => void): this;
}

type MyWebSocket = WS & EventEmitter;

export { Handler, MyWebSocket, PeerExpressApplication };
