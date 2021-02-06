import express from "express";
import { EventEmitter } from "events";
import { Server } from "net";
import WebSocketLib from "ws";

declare module "peer" {
  type WebSocket = WebSocketLib & EventEmitter;

  type Optional<T> = {
    [P in keyof T]?: T[P] | undefined;
  };

  interface IConfig {
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

  interface IClient {
    getId(): string;
    getToken(): string;
    getSocket(): WebSocket | null;
    setSocket(socket: WebSocket | null): void;
    getLastPing(): number;
    setLastPing(lastPing: number): void;
    send(data: any): void;
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

  interface IMessage {
    readonly type: MessageType;
    readonly src: string;
    readonly dst: string;
    readonly payload?: any;
  }

  interface CustomExpress extends express.Express {
    on(event: string, callback: (...args: any[]) => void): this;
    on(event: "connection", callback: (client: IClient) => void): this;
    on(event: "disconnect", callback: (client: IClient) => void): this;
    on(
      event: "message",
      callback: (client: IClient, message: IMessage) => void
    ): this;
    on(event: "error", callback: (error: Error) => void): this;
  }

  function ExpressPeerServer(server: Server, options?: IConfig): CustomExpress;

  function PeerServer(
    options?: Optional<IConfig>,
    callback?: (server: Server) => void
  ): CustomExpress;
}
