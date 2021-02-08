import Client from "models/client";
import ClientMessage from "schemas/client-message";

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

export { Config, Handler, IAuthParams };
