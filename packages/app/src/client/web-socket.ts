function main(): WebSocket {
  const url = location.href.replace(/http/, "ws");
  const webSocket = new WebSocket(url);
  return webSocket;
}

function onClose(this: WebSocket, closeEvent: CloseEvent): void {
  console.info("WebSocket.onClose", { closeEvent });
}

function onError(this: WebSocket, event: Event): void {
  console.error("WebSocket.onError", { event });
}

function onMessage(this: WebSocket, messageEvent: MessageEvent): void {
  console.info("WebSocket.onMessage", { messageEvent });
}

function onOpen(this: WebSocket, event: Event): void {
  console.info("WebSocket.onOpen", { event });
}

export default main;
export { onClose, onError, onMessage, onOpen };
