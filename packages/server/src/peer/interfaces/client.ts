import MyWebSocket from "../schemas/my-web-socket";

interface Client {
  getId(): string;
  getToken(): string;
  getSocket(): MyWebSocket | null;
  setSocket(socket: MyWebSocket | null): void;
  getLastPing(): number;
  setLastPing(lastPing: number): void;
  send(data: unknown): void;
}

export default Client;
