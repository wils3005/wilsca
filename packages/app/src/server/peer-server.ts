import * as Peer from "peer";
import * as Root from ".";

function main(): Peer.CustomExpress {
  const peerServer = Peer.PeerServer({
    allow_discovery: true,
    key: "mykey",
    path: "/p",
    port: 3478,
  });

  peerServer.on("connection", onConnection);
  peerServer.on("disconnect", onDisconnect);
  peerServer.on("error", onError);
  peerServer.on("message", onMessage);
  return peerServer;
}

function onConnection(this: Peer.CustomExpress, client: Peer.IClient): void {
  Root.logger.info("peerServer.onConnection", { client });
  Root.peerClients.add(client);
}

function onDisconnect(this: Peer.CustomExpress, client: Peer.IClient): void {
  Root.logger.info("peerServer.onDisconnect", { client });
  Root.peerClients.delete(client);
}

function onError(this: Peer.CustomExpress, error: Error): void {
  Root.logger.error("peerServer.onError", { error });
}

function onMessage(
  this: Peer.CustomExpress,
  client: Peer.IClient,
  message: Peer.IMessage
): void {
  Root.logger.info(
    `peerServer.onMessage, ${client.constructor.name}, ${message.type}, ${
      message.src
    }, ${message.dst}, ${String(message.payload)}`
  );
}

export default main;
export { onConnection, onDisconnect, onError, onMessage };
