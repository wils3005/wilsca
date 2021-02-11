import WebSocket from "ws";

// receives WebSocket
class Client {
  id: string;
  token: string;
  socket: WebSocket | null = null;
  lastPing: number = new Date().getTime();

  constructor(id: string, token: string) {
    this.id = id;
    this.token = token;
  }

  getId(): string {
    return this.id;
  }

  getToken(): string {
    return this.token;
  }

  getSocket(): WebSocket | null {
    return this.socket;
  }

  setSocket(socket: WebSocket | null): void {
    this.socket = socket;
  }

  getLastPing(): number {
    return this.lastPing;
  }

  setLastPing(lastPing: number): void {
    this.lastPing = lastPing;
  }

  send<T>(data: T): void {
    this.socket?.send(JSON.stringify(data));
  }
}

export default Client;
