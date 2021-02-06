import * as Peer from "peer";
import Logger from "./logger";
import Net from "net";

// TODO
const logger = Logger();

const peerClients: Set<Peer.IClient> = new Set();

function main(server: Net.Server): Peer.CustomExpress {
  const peerServer: Peer.CustomExpress = Peer.ExpressPeerServer(server, {
    allow_discovery: true,
    key: "baz",
    path: "/bar",
  });

  peerServer.on("connection", onConnection);
  peerServer.on("disconnect", onDisconnect);
  peerServer.on("error", onError);
  peerServer.on("message", onMessage);
  return peerServer;
}

function onConnection(this: Peer.CustomExpress, client: Peer.IClient): void {
  logger.info("peerServer.onConnection", { client });
  peerClients.add(client);
}

function onDisconnect(this: Peer.CustomExpress, client: Peer.IClient): void {
  logger.info("peerServer.onDisconnect", { client });
  peerClients.delete(client);
}

function onError(this: Peer.CustomExpress, error: Error): void {
  logger.error("peerServer.onError", { error });
}

function onMessage(
  this: Peer.CustomExpress,
  client: Peer.IClient,
  message: Peer.IMessage
): void {
  logger.info("peerServer.onMessage", { client, message });
}

export default main;
export { onConnection, onDisconnect, onError, onMessage };
