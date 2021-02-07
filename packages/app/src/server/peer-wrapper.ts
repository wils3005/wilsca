import * as Peer from "peer";
import * as Root from ".";
import WS from "ws";

function main(server: WS.Server): Peer.ExpressApplication {
  const peer = Peer.ExpressPeerServer(server, {
    allow_discovery: true,
    path: "/",
  });

  peer.on("connection", onConnection);
  peer.on("disconnect", onDisconnect);
  peer.on("error", onError);
  peer.on("message", onMessage);
  return peer;
}

function onConnection(
  this: Peer.ExpressApplication,
  client: Peer.Client
): void {
  Root.logger.info({
    module: "peer-wrapper",
    function: "onConnection",
    client,
  });
  Root.peerClients.add(client);
}

function onDisconnect(
  this: Peer.ExpressApplication,
  client: Peer.Client
): void {
  Root.logger.info({
    module: "peer-wrapper",
    function: "onDisconnect",
    client,
  });
  Root.peerClients.delete(client);
}

function onError(this: Peer.ExpressApplication, error: Error): void {
  Root.logger.error({ module: "peer-wrapper", function: "onError", error });
}

function onMessage(
  this: Peer.ExpressApplication,
  client: Peer.Client,
  message: Peer.Message
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
