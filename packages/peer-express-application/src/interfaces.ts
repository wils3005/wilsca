import Client from "models/client";
import ClientMessage from "schemas/client-message";
import Express from "express";

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

export { Config, Handler, IAuthParams, PeerExpressApplication };
