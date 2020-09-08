import { EventEmitter } from "events";
import { ExpressPeerServer } from "peer";
import { Server } from "@hapi/hapi";
import WebSocket from "ws";

declare type PeerWebSocket = WebSocket & EventEmitter;

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

const peerClients: Set<PeerClient> = new Set();

const plugin = {
  name: "peer-server",
  register,
};

export default plugin;

export function register(server: Server, options?: PeerConfig): void {
  const { path, proxied } = options || {};
  const { logger } = server;

  const peerServer = ExpressPeerServer(server.listener, {
    path,
    proxied,
  });

  peerServer.on("error", (error) => {
    logger.error("PeerServer error", error);
  });

  peerServer.on("connection", (client) => {
    peerClients.add(client);
    logger.info("PeerServer connection", { client });
  });

  peerServer.on("disconnect", (client) => {
    peerClients.delete(client);
    logger.info("PeerServer disconnect", { client });
  });

  peerServer.on("message", (client, message) => {
    logger.info("PeerServer message", { client, message });
  });
}
