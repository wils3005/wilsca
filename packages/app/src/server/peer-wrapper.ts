import * as Root from ".";
import Client from "peer-express-application/dist/models/client";
import ClientMessage from "peer-express-application/dist/schemas/client-message";
import Express from "express";
import PeerExpressApplication from "peer-express-application";
import WS from "ws";

function main(server: WS.Server): unknown {
  const peer = PeerExpressApplication(server, {
    allow_discovery: true,
    path: "/",
  });

  peer.on("connection", onConnection);
  peer.on("disconnect", onDisconnect);
  peer.on("error", onError);
  peer.on("message", onMessage);
  return peer;
}

function onConnection(this: Express.Express, client: Client): void {
  Root.logger.info({
    module: "peer-wrapper",
    function: "onConnection",
    client,
  });
  Root.peerClients.add(client);
}

function onDisconnect(this: Express.Express, client: Client): void {
  Root.logger.info({
    module: "peer-wrapper",
    function: "onDisconnect",
    client,
  });
  Root.peerClients.delete(client);
}

function onError(this: Express.Express, error: Error): void {
  Root.logger.error({ module: "peer-wrapper", function: "onError", error });
}

function onMessage(
  this: Express.Express,
  client: Client,
  message: ClientMessage
): void {
  Root.logger.info({
    module: "peer-wrapper",
    function: "onMessage",
    client,
    message,
  });

  client.send(`Test message: ${Math.random()}`);
}

export default main;
export { onConnection, onDisconnect, onError, onMessage };
