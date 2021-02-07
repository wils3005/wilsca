declare interface Config {
  readonly host: string;
  readonly port: number;
  readonly expire_timeout: number;
  readonly alive_timeout: number;
  readonly key: string;
  readonly path: string;
  readonly concurrent_limit: number;
  readonly allow_discovery: boolean;
  readonly proxied: boolean | string;
  readonly cleanup_out_msgs: number;
  readonly ssl?: {
    key: string;
    cert: string;
  };
  readonly generateClientId?: () => string;
}

declare enum Errors {
  INVALID_KEY = "Invalid key provided",
  INVALID_TOKEN = "Invalid token provided",
  INVALID_WS_PARAMETERS = "No id, token, or key supplied to websocket server",
  CONNECTION_LIMIT_EXCEED = "Server has reached its concurrent user limit",
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
