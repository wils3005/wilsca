import { log } from "./consoleLogger";

const { host } = location;

let webSocket: WebSocket;
let webSocketErrors = 0;

function getWebSocket(): WebSocket {
  if (!webSocket) setWebSocket();
  return webSocket;
}

function onError(this: WebSocket): void {
  log(new Error("todo"));
  webSocketErrors += 1;
  setWebSocket();
}

function onMessage(this: WebSocket): void {
  log();
}

function onOpen(this: WebSocket): void {
  log();
}

function setWebSocket(): void {
  if (webSocketErrors >= 10) return;

  webSocket = new WebSocket(`wss://${host}/w`);
  webSocket.addEventListener("error", onError);
  webSocket.addEventListener("open", onOpen);
  webSocket.addEventListener("message", onMessage);
}

export { getWebSocket, onError, onMessage, onOpen, setWebSocket };
