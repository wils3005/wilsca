declare class EventEmitter {}

declare type MyWebSocket = WebSocket & EventEmitter;

declare interface PeerClient {
  getId(): string;
  getToken(): string;
  getSocket(): MyWebSocket | null;
  setSocket(socket: MyWebSocket | null): void;
  getLastPing(): number;
  setLastPing(lastPing: number): void;
  send(data: unknown): void;
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

declare interface PeerMessage {
  readonly type: PeerMessageType;
  readonly src: string;
  readonly dst: string;
  readonly payload?: unknown;
}
