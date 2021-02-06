import * as Root from ".";
import WebSocket from "ws";

function main(webSocket: WebSocket): WebSocket {
  webSocket.on("close", onClose);
  webSocket.on("error", onError);
  webSocket.on("message", onMessage);
  webSocket.on("open", onOpen);
  return webSocket;
}

function onClose(event: WebSocket.CloseEvent): void {
  Root.logger.info("WebSocketModule.onClose", { event });
}

function onError(event: WebSocket.ErrorEvent): void {
  Root.logger.error(`WebSocketModule.onError: ${event.message}`);
}

function onMessage(event: WebSocket.MessageEvent): void {
  Root.logger.info(`WebSocketModule.onMessage: ${String(event.data)}`);
}

function onOpen(event: WebSocket.OpenEvent): void {
  Root.logger.info("WebSocketModule.onOpen", { event });
}

export default main;
export { onClose, onError, onMessage, onOpen };
