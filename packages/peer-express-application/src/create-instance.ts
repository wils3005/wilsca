import { ClientMessage, Config, IRealm } from "interfaces";
import { Api } from "api";
import { CheckBrokenConnections } from "services/checkBrokenConnections";
import Client from "models/client";
import Express from "express";
import MessageHandler from "message-handler";
import { MessagesExpire } from "services/messagesExpire";
import Path from "path";
import { Realm } from "models/realm";
import WS from "ws";
import WebSocketServer from "services/webSocketServer";

function main({
  app,
  server,
  options,
}: {
  app: Express.Application;
  server: WS.Server;
  options: Config;
}): void {
  const config = options;
  const realm: IRealm = new Realm();
  const messageHandler = new MessageHandler(realm);

  const api = Api({ config, realm, messageHandler });
  const messagesExpire = new MessagesExpire({
    realm,
    config,
    messageHandler,
  });
  const checkBrokenConnections = new CheckBrokenConnections({
    realm,
    config,
    onClose: (client): void => {
      app.emit("disconnect", client);
    },
  });

  app.use(options.path, api);

  //use mountpath for WS server
  const customConfig = {
    ...config,
    path: Path.posix.join(app.path(), options.path, "/"),
  };

  const wss = new WebSocketServer({
    server,
    realm,
    config: customConfig,
  });

  wss.on("connection", (client: Client) => {
    const messageQueue = realm.getMessageQueueById(client.getId());

    if (messageQueue) {
      let message: ClientMessage | undefined;

      while ((message = messageQueue.readMessage())) {
        messageHandler.handle(client, message);
      }
      realm.clearMessageQueue(client.getId());
    }

    app.emit("connection", client);
  });

  wss.on("message", (client: Client, message: ClientMessage) => {
    app.emit("message", client, message);
    messageHandler.handle(client, message);
  });

  wss.on("close", (client: Client) => {
    app.emit("disconnect", client);
  });

  wss.on("error", (error: Error) => {
    app.emit("error", error);
  });

  messagesExpire.startMessagesExpiration();
  checkBrokenConnections.start();
}

export default main;
