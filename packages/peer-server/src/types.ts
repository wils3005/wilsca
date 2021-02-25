/* eslint-disable @typescript-eslint/no-explicit-any */
import { Server } from "net";
import { EventEmitter } from "events";
import WebSocketLib from "ws";
import Express from "express";

export declare type MyWebSocket = WebSocketLib & EventEmitter;

export declare interface IConfig {
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

export declare interface IClient {
  getId(): string;
  getToken(): string;
  getSocket(): MyWebSocket | null;
  setSocket(socket: MyWebSocket | null): void;
  getLastPing(): number;
  setLastPing(lastPing: number): void;
  send(data: any): void;
}

export declare enum MessageType {
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

export declare interface IMessage {
  readonly type: MessageType;
  readonly src: string;
  readonly dst: string;
  readonly payload?: any;
}

export declare interface CustomExpress extends Express.Express {
  on(event: string, callback: (...args: any[]) => void): this;
  on(event: "connection", callback: (client: IClient) => void): this;
  on(event: "disconnect", callback: (client: IClient) => void): this;
  on(
    event: "message",
    callback: (client: IClient, message: IMessage) => void
  ): this;
  on(event: "error", callback: (error: Error) => void): this;
}

export declare function ExpressPeerServer(
  server: Server,
  options?: IConfig
): CustomExpress;

export declare function PeerServer(
  options?: Optional<IConfig>,
  callback?: (server: Server) => void
): CustomExpress;

export declare type Optional<T> = {
  [P in keyof T]?: T[P] | undefined;
};

export declare function ExpressPeerServer(
  server: Server,
  options?: IConfig
): import("express-serve-static-core").Express;

export declare function PeerServer(
  options?: Optional<IConfig>,
  callback?: (server: Server) => void
): import("express-serve-static-core").Express;
