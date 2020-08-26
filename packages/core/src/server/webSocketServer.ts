import { httpServer, logger } from ".";
import WebSocket from "ws";

const webSocketServer = new WebSocket.Server({ server: httpServer });

webSocketServer.on("connection", handleConnection);
webSocketServer.on("error", (e) => logger.error(e));

export default webSocketServer;

export function handleConnection(socket: WebSocket): void {
  socket.on("message", handleMessage);
  socket.on("error", (e) => logger.error(e));
}

export function handleMessage(this: WebSocket, data: WebSocket.Data): void {
  for (const client of webSocketServer.clients) {
    client.send(String(data), (e) => e && logger.error(e));
  }
}
