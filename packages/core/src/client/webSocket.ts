const { host, protocol } = window.location;

const protocolMap = new Map([
  ["http:", "ws:"],
  ["https:", "wss:"],
]);

const wsProtocol = String(protocolMap.get(protocol));
let webSocket = createWebSocket();
let webSocketErrors = 0;
const maxErrors = 10;

createWebSocket();
Object.assign(globalThis, { say });

export default webSocket;

export function createWebSocket(): WebSocket {
  const newWebSocket = new WebSocket(`${wsProtocol}//${host}`);
  newWebSocket.addEventListener("open", handleOpen);
  newWebSocket.addEventListener("message", handleMessage);
  newWebSocket.addEventListener("error", handleError);
  return newWebSocket;
}

export function handleOpen(): void {
  console.info(`[${getTimestamp()}] WEBSOCKET OPEN`);
}

export function handleMessage(
  this: WebSocket,
  eventMessage: MessageEvent
): void {
  const message = String(eventMessage.data);
  console.info(`[${getTimestamp()}] WEBSOCKET MESSAGE\n${message}`);
}

export function handleError(): void {
  webSocketErrors += 1;
  if (webSocketErrors > maxErrors) return;

  console.info(`[${getTimestamp()}] WEBSOCKET ERROR`);
  webSocket = createWebSocket();
}

export function getTimestamp(): string {
  return new Date().toLocaleTimeString();
}

export function say(s: string): void {
  try {
    webSocket.send(s);
  } catch (e) {
    console.error(e);
  }
}
