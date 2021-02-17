import Base, { LogLevel } from "./base";
import MessageEventData from "./message-event-data";

class WebSocketManager extends Base {
  static readonly WS_URL = "ws://localhost:8080";
  socket?: WebSocket;

  constructor() {
    super();
    this.handleWebSocket(new WebSocket(WebSocketManager.WS_URL));
  }

  handleWebSocket(socket: WebSocket): void {
    this.log("handleWebSocket");
    socket.onclose = (ev) => this.log(ev);
    socket.onerror = (ev) => this.log(ev, LogLevel.ERROR);
    socket.onmessage = (ev) => new MessageEventData(ev);
    socket.onopen = () => this.handleOpen();
    this.socket = socket;
  }

  // (this: WebSocket, ev: Event) => any
  handleOpen(): void {
    this.log("handleOpen");
  }
}

export default WebSocketManager;
