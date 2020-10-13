import { Plugin, Server } from "@hapi/hapi";
import { EventEmitter } from "events";
import { ExpressPeerServer } from "peer";
import pino from "pino";
declare interface PeerClient {
  getId(): string;
  getToken(): string;
  getSocket(): PeerWebSocket | null;
  setSocket(socket: PeerWebSocket | null): void;
  getLastPing(): number;
  setLastPing(lastPing: number): void;
  send(data: unknown): void;
}

declare interface PeerConfig {
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

declare interface PeerMessage {
  readonly type: PeerMessageType;
  readonly src: string;
  readonly dst: string;
  readonly payload?: unknown;
}

declare enum PeerMessageType {
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

declare type PeerWebSocket = WebSocket & EventEmitter;

const peerClients: Set<PeerClient> = new Set();

const plugin: Plugin<PeerConfig> = {
  name: "peer-server",
  register,
};

let logger: pino.Logger;

function onConnection(client: PeerClient): void {
  peerClients.add(client);
  logger?.info("PeerServer connection", { client });
}

function onDisconnect(client: PeerClient): void {
  peerClients.delete(client);
  logger?.info("PeerServer disconnect", { client });
}

function onError(error: Error): void {
  logger?.error("PeerServer error", error);
}

function onMessage(client: PeerClient, message: PeerMessage): void {
  logger?.info("PeerServer message", { client, message });
}

function register(server: Server, options?: PeerConfig): void {
  logger = server.logger;
  const { path, proxied } = options || {};

  ExpressPeerServer(server.listener, {
    path,
    proxied,
  })
    .on("error", onError)
    .on("connection", onConnection)
    .on("disconnect", onDisconnect)
    .on("message", onMessage);
}

export default plugin;
export {
  PeerClient,
  PeerConfig,
  PeerMessage,
  PeerMessageType,
  PeerWebSocket,
  onError,
  onConnection,
  onDisconnect,
  onMessage,
  register,
};
