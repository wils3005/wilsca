import { CustomExpress, IClient, IMessage } from "types/peer";
import { ExpressPeerServer } from "peer";
import { Server } from "net";
import logger from "./logger";

const peerClients: Set<IClient> = new Set();

function main(server: Server): CustomExpress {
  const peerServer: CustomExpress = ExpressPeerServer(server, {
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

export default main;
export { onConnection, onDisconnect, onError, onMessage };
