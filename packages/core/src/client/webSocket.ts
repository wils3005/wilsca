const { name } = globalThis.constructor;
const { host, protocol } = location;

const protocolMap = new Map([
  ["http:", "ws:"],
  ["https:", "wss:"],
]);

const wsProtocol = String(protocolMap.get(protocol));
// const webSocket = createWebSocket();
// let webSocketErrors = 0;
// const maxErrors = 10;

// createWebSocket();
// Object.assign(globalThis, { say });
// console.info(globalThis.constructor.name, { webSocket });

// export default webSocket;

export function create(): WebSocket {
  const newWebSocket = new WebSocket(`${wsProtocol}//${host}/w`);
  newWebSocket.addEventListener("error", handleError);
  newWebSocket.addEventListener("open", handleOpen);
  newWebSocket.addEventListener("message", handleMessage);
  return newWebSocket;
}

export function handleError(this: WebSocket, ev: Event): void {
  console.error(timestamp(), name, this.constructor.name, { ev });
  // webSocket = createWebSocket();
}

export function handleOpen(this: WebSocket, ev: Event): void {
  console.info(timestamp(), name, this.constructor.name, { ev });
}

export function handleMessage(
  this: WebSocket,
  eventMessage: MessageEvent
): void {
  console.info(timestamp(), name, this.constructor.name, { eventMessage });
  // const message = String(eventMessage.data);
}

export function timestamp(): string {
  const a = /\d{2}:\d{2}:\d{2}\.\d{3}/.exec(new Date().toJSON()) || [""];
  return a[0];
}
