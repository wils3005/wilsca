import { EventEmitter } from "events";
import Express from "express";
import WS from "ws";

declare module "peer" {
  type WebSocket = WS & EventEmitter;

  type Optional<T> = {
    [P in keyof T]?: T[P] | undefined;
  };

  interface Config {
    readonly port?: number;
    readonly expire_timeout?: number;
    readonly alive_timeout?: number;
    readonly key?: string;
    readonly path?: string;
    readonly concurrent_limit?: number;
    readonly allow_discovery?: boolean;
    readonly proxied?: boolean | string;
    readonly cleanup_out_msgs?: number;
    readonly ssl?: {
      key: string;
      cert: string;
    };
    readonly generateClientId?: () => string;
  }

  interface Client {
    getId(): string;
    getToken(): string;
    getSocket(): WebSocket | null;
    setSocket(socket: WebSocket | null): void;
    getLastPing(): number;
    setLastPing(lastPing: number): void;
    send(data: unknown): void;
  }

  enum MessageType {
    OPEN = "OPEN",
    LEAVE = "LEAVE",
    CANDIDATE = "CANDIDATE",
    OFFER = "OFFER",
    ANSWER = "ANSWER",
    EXPIRE = "EXPIRE",
    HEARTBEAT = "HEARTBEAT",
    ID_TAKEN = "ID-TAKEN",
    ERROR = "ERROR",
  }

  interface Message {
    readonly type: MessageType;
    readonly src: string;
    readonly dst: string;
    readonly payload?: unknown;
  }

  interface ExpressApplication extends Express.Express {
    on(event: string, callback: (...args: Express.Express[]) => void): this;
    on(event: "connection", callback: (client: Client) => void): this;
    on(event: "disconnect", callback: (client: Client) => void): this;
    on(
      event: "message",
      callback: (client: Client, message: Message) => void
    ): this;
    on(event: "error", callback: (error: Error) => void): this;
  }

  function ExpressPeerServer(
    server: WS.Server,
    options?: Config
  ): ExpressApplication;
}
