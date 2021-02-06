import express from "express";
import { EventEmitter } from "events";
import { Server } from "net";
import WebSocketLib from "ws";

declare type MyWebSocket = WebSocketLib & EventEmitter;

declare type Optional<T> = {
  [P in keyof T]?: T[P] | undefined;
};

declare interface IConfig {
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

declare interface IClient {
  getId(): string;
  getToken(): string;
  getSocket(): MyWebSocket | null;
  setSocket(socket: MyWebSocket | null): void;
  getLastPing(): number;
  setLastPing(lastPing: number): void;
  send(data: any): void;
}

declare enum MessageType {
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

declare interface IMessage {
  readonly type: MessageType;
  readonly src: string;
  readonly dst: string;
  readonly payload?: any;
}

declare interface CustomExpress extends express.Express {
  on(event: string, callback: (...args: any[]) => void): this;
  on(event: "connection", callback: (client: IClient) => void): this;
  on(event: "disconnect", callback: (client: IClient) => void): this;
  on(
    event: "message",
    callback: (client: IClient, message: IMessage) => void
  ): this;
  on(event: "error", callback: (error: Error) => void): this;
}

declare function ExpressPeerServer(
  server: Server,
  options?: IConfig
): CustomExpress;

declare function PeerServer(
  options?: Optional<IConfig>,
  callback?: (server: Server) => void
): CustomExpress;

export {
  CustomExpress,
  IClient,
  IConfig,
  IMessage,
  MessageType,
  MyWebSocket,
  Optional,
};
