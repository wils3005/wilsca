import events = require('events');
import { ExpressPeerServer } from 'peer';
import { Server } from '@hapi/hapi';
import WebSocket = require('ws');

declare type PeerWebSocket = WebSocket & events.EventEmitter;

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
  name: 'peer-server',
  register,
};

function register(server: Server, options?: PeerConfig): void {
  const { path, proxied } = options || {};
  const { logger } = server;

  ExpressPeerServer(server.listener, {
    path,
    proxied,
  })
    .on('error', (error) => {
      logger.error('PeerServer error', error);
    })
    .on('connection', (client) => {
      peerClients.add(client);
      logger.info('PeerServer connection', { client });
    })
    .on('disconnect', (client) => {
      peerClients.delete(client);
      logger.info('PeerServer disconnect', { client });
    })
    .on('message', (client, message) => {
      logger.info('PeerServer message', { client, message });
    });
}

export { plugin, register };
