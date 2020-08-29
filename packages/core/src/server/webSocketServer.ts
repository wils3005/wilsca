import { httpServer, logger } from ".";
import WebSocket from "ws";

const webSocketServer = new WebSocket.Server({ server: httpServer });

webSocketServer.on("connection", (webSocket) => {
  webSocket.on("message", (data) => {
    for (const client of webSocketServer.clients) {
      client.send(String(data), (e) => e && logger.error(e));
    }
  });

  webSocket.on("error", (e) => logger.error(e));
});

webSocketServer.on("error", (e) => logger.error(e));

export default webSocketServer;
