import { CustomExpress, ExpressPeerServer } from "peer";
import express from "express";
import logger from "./logger";
import server from "./server";

const peerServer: CustomExpress = ExpressPeerServer(server, {
  allow_discovery: true,
  key: "baz",
  path: "/bar",
});

const peerClients: Set<IClient> = new Set();

function onConnection(this: CustomExpress, client: IClient): void {
  peerClients.add(client);
  logger.info("peer server connection", { client });
}

function onDisconnect(this: CustomExpress, client: IClient): void {
  peerClients.delete(client);
  logger.info("peer server disconnect", { client });
}

function onError(this: CustomExpress, error: Error): void {
  logger.error("peer server error", { error });
}

function onMessage(
  this: CustomExpress,
  client: IClient,
  message: IMessage
): void {
  logger.info("peer server message", { client, message });
}

peerServer.on("connection", onConnection);
peerServer.on("disconnect", onDisconnect);
peerServer.on("message", onMessage);
peerServer.on("error", onError);

export default peerServer;
