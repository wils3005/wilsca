import { CustomExpress, IClient, IMessage } from "types/peer";
import { ExpressPeerServer } from "peer";
import logger from "src/logger";
import server from "src/server";

const peerServer: CustomExpress = ExpressPeerServer(server, {
  allow_discovery: true,
  key: "baz",
  path: "/bar",
});

const peerClients: Set<IClient> = new Set();

function onConnection(this: CustomExpress, client: IClient): void {
  logger.info("peerServer.onConnection", { client });
  peerClients.add(client);
}

function onDisconnect(this: CustomExpress, client: IClient): void {
  logger.info("peerServer.onDisconnect", { client });
  peerClients.delete(client);
}

function onError(this: CustomExpress, error: Error): void {
  logger.error("peerServer.onError", { error });
}

function onMessage(
  this: CustomExpress,
  client: IClient,
  message: IMessage
): void {
  logger.info("peerServer.onMessage", { client, message });
}

peerServer.on("connection", onConnection);
peerServer.on("disconnect", onDisconnect);
peerServer.on("error", onError);
peerServer.on("message", onMessage);

export default peerServer;
