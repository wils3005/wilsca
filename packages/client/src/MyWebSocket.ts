const { name: globalThisType } = globalThis.constructor;
const moduleName = "MyWebSocket";
const { host } = location;

let webSocket: WebSocket;
let webSocketErrors = 0;

export function getWebSocket(): WebSocket {
  if (!webSocket) setWebSocket();

  return webSocket;
}

export function handleError(this: WebSocket): void {
  const functionName = "handleError";
  console.error(timestamp(), globalThisType, moduleName, functionName);
  webSocketErrors += 1;
  setWebSocket();
}

export function handleMessage(this: WebSocket): void {
  const functionName = "handleMessage";
  console.info(timestamp(), globalThisType, moduleName, functionName);
  // const message = String(eventMessage.data);
}

export function handleOpen(this: WebSocket): void {
  const functionName = "handleOpen";
  console.info(timestamp(), globalThisType, moduleName, functionName);
}

export function setWebSocket(): void {
  if (webSocketErrors >= 10) return;

  webSocket = new WebSocket(`wss://${host}/w`);
  webSocket.addEventListener("error", handleError);
  webSocket.addEventListener("open", handleOpen);
  webSocket.addEventListener("message", handleMessage);
}

export function timestamp(): string {
  const a = /\d{2}:\d{2}:\d{2}\.\d{3}/.exec(new Date().toJSON()) || [""];
  return a[0];
}
