import Client from "models/client";
import MessageQueue from "models/message-queue";
import { MessageType } from "enums";

interface ClientMessage {
  type: MessageType;
  src: string;
  dst: string;
  payload?: unknown;
}

interface Config {
  host: string;
  port: number;
  expire_timeout: number;
  alive_timeout: number;
  key: string;
  path: string;
  concurrent_limit: number;
  allow_discovery: boolean;
  proxied: boolean | string;
  cleanup_out_msgs: number;
  ssl?: {
    key: string;
    cert: string;
  };
  generateClientId?: () => string;
}

interface Handler {
  (client: Client | undefined, message: ClientMessage): boolean;
}

interface IAuthParams {
  id?: string;
  token?: string;
  key?: string;
}

interface IRealm {
  addMessageToQueue(id: string, message: ClientMessage): void;
  clearMessageQueue(id: string): void;
  generateClientId(generateClientId?: () => string): string;
  getClientById(clientId: string): Client | undefined;
  getClientsIds(): string[];
  getClientsIdsWithQueue(): string[];
  getMessageQueueById(id: string): MessageQueue | undefined;
  removeClientById(id: string): boolean;
  setClient(client: Client, id: string): void;
}

export { ClientMessage, Config, Handler, IAuthParams, IRealm };
