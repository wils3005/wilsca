import * as Root from ".";
import HTTP from "http";
import WebSocket from "ws";
import WebSocketModule from "./web-socket";

function main(server: HTTP.Server): WebSocket.Server {
  const wss = new WebSocket.Server({ server });
  wss.on("connection", onConnection);
  wss.on("close", onClose);
  wss.on("error", onError);
  wss.on("headers", onHeaders);
  return wss;
}

function onConnection(
  this: WebSocket.Server,
  webSocket: WebSocket,
  request: HTTP.IncomingMessage
): void {
  Root.logger.info("WebSocketServer.onConnection", { webSocket, request });
  // TODO
  WebSocketModule(webSocket);
}

function onClose(this: WebSocket.Server): void {
  Root.logger.info("WebSocketServer.onClose");
}

function onError(this: WebSocket.Server, error: Error): void {
  Root.logger.error(`WebSocketServer.onError: ${String(error.message)}`);
}

function onHeaders(
  this: WebSocket.Server,
  headers: string[],
  request: HTTP.IncomingMessage
): void {
  Root.logger.info("WebSocketServer.onHeaders", { headers, request });
}

export default main;
export { onConnection, onClose, onError, onHeaders };
