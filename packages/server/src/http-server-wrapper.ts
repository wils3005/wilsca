// import Express from "express";
// import HTTP from "http";
// import Net from "net";

// function main(rootApplication: Express.Express, port: string): HTTP.Server {
//   const httpServer = rootApplication.listen(port);
//   // httpServer.on("upgrade", onUpgrade);
//   return httpServer;
// }

// function onUpgrade(
//   request: HTTP.IncomingMessage,
//   socket: Net.Socket,
//   head: Buffer
// ): void {
//   // const pathname = url.parse(request.url).pathname;

//   if (request.url == "/peer") {
//     // TODO
//   }

//   if (request.url === "/peerjs") {
//     wss1.handleUpgrade(request, socket, head, function done(ws) {
//       wss1.emit("connection", ws, request);
//     });
//   } else if (pathname === "/bar") {
//     wss2.handleUpgrade(request, socket, head, function done(ws) {
//       wss2.emit("connection", ws, request);
//     });
//   } else {
//     socket.destroy();
//   }
// }

// export default main;
// export { onUpgrade };
