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
  Root.logger.info({ module: "peer-server", function: "onConnection", client });
  Root.peerClients.add(client);
}

function onDisconnect(this: Peer.CustomExpress, client: Peer.IClient): void {
  Root.logger.info({ module: "peer-server", function: "onDisconnect", client });
  Root.peerClients.delete(client);
}

function onError(this: Peer.CustomExpress, error: Error): void {
  Root.logger.error({ module: "peer-server", function: "onError", error });
}

function onMessage(
  this: Peer.CustomExpress,
  client: Peer.IClient,
  message: Peer.IMessage
): void {
  Root.logger.info({
    module: "peer-server",
    function: "onMessage",
    client,
    message,
  });

  client.send(`Test message: ${Math.random()}`);
}

export default main;
export { onConnection, onDisconnect, onError, onMessage };
