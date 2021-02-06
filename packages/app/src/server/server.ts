import * as Root from ".";
import Express from "express";
import HTTP from "http";
// import Net from "net";
// import WebSocket from "ws";

function main(app: Express.Express): HTTP.Server {
  const server = app.listen(Root.PORT);
  // server.on("upgrade", onUpgrade);
  return server;
}

// function handleUpgrade(socket: WebSocket, request: HTTP.IncomingMessage): void {
//   Root.logger.info("ServerModule.handleUpgrade");
//   // Root.webSocketServer.emit("connection", socket, request);
// }

// function onUpgrade(
//   request: HTTP.IncomingMessage,
//   socket: Net.Socket,
//   head: Buffer
// ): void {
//   Root.logger.info("ServerModule.onUpgrade");
//   // Root.webSocketServer.handleUpgrade(request, socket, head, handleUpgrade);
// }

export default main;
export {};
