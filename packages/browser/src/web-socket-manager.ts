import Base, { LogLevel } from "./base";
import Message from "./message";

class WebSocketManager extends Base {
  static readonly WS_URL = "ws://localhost:8080";

  messages = Array<Message>();
  socket?: WebSocket;

  constructor() {
    super();
    this.setWebSocket();
  }

  setWebSocket(socket = new WebSocket(WebSocketManager.WS_URL)): void {
    this.log("setWebSocket");
    socket.onclose = () => this.close();
    socket.onerror = (x) => this.error(x);
    socket.onmessage = (x) => this.message(x);
    socket.onopen = () => this.open();
    this.socket = socket;
  }

  close(): void {
    this.log("close");
    if (this.socket) this.socket.close();
    this.setWebSocket();
  }

  error(event: Event): void {
    this.log(event, LogLevel.ERROR);
    if (this.socket) this.socket.close();
    this.setWebSocket();
  }

  message(event: MessageEvent<unknown>): void {
    this.log("message");
    this.messages.push(new Message(event.data));
  }

  open(): void {
    this.log("open");
  }

  send(data: unknown): void {
    if (this.socket) this.socket.send(JSON.stringify(data));
  }
}

export default WebSocketManager;
