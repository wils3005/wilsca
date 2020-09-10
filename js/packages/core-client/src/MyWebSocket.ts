const { name: globalThisName } = globalThis.constructor;
const moduleName = "MyWebSocket";
const { host, protocol } = location;

const protocolMap = new Map([
  ["http:", "ws:"],
  ["https:", "wss:"],
]);

const wsProtocol = String(protocolMap.get(protocol));

let webSocket: WebSocket;
let webSocketErrors = 0;

export function getWebSocket(): WebSocket {
  if (!webSocket) setWebSocket();

  return webSocket;
}

export function setWebSocket(): void {
  if (webSocketErrors >= 10) return;

  webSocket = new WebSocket(`${wsProtocol}//${host}/w`);
  webSocket.addEventListener("error", handleError);
  webSocket.addEventListener("open", handleOpen);
  webSocket.addEventListener("message", handleMessage);
}

export function handleError(this: WebSocket): void {
  const functionName = "handleError";
  console.error(timestamp(), globalThisName, moduleName, functionName);
  webSocketErrors += 1;
  setWebSocket();
}

export function handleOpen(this: WebSocket): void {
  const functionName = "handleOpen";
  console.info(timestamp(), globalThisName, moduleName, functionName);
}

export function handleMessage(this: WebSocket): void {
  const functionName = "handleMessage";
  console.info(timestamp(), globalThisName, moduleName, functionName);
  // const message = String(eventMessage.data);
}

export function timestamp(): string {
  const a = /\d{2}:\d{2}:\d{2}\.\d{3}/.exec(new Date().toJSON()) || [""];
  return a[0];
}
