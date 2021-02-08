import API from "api";
import { CheckBrokenConnections } from "check-broken-connections";
import Client from "client";
import ClientMessage from "client-message";
import Config from "schemas/config";
import Express from "express";
import MessageHandler from "message-handler";
import { MessagesExpire } from "messages-expire";
import Path from "path";
import Realm from "realm";
import WS from "ws";
import WebSocketServerWrapper from "web-socket-server-wrapper";

function main(
  app: Express.Application,
  server: WS.Server,
  options: Config
): void {
  const config = Config.parse(options);
  const realm: Realm = new Realm();
  const messageHandler = new MessageHandler(realm);
  const api = API(realm, config, messageHandler);
  const { cleanupOutMessages, expireTimeout } = config;
  const messagesExpire = new MessagesExpire(
    realm,
    cleanupOutMessages,
    expireTimeout,
    messageHandler
  );

  const checkBrokenConnections = new CheckBrokenConnections(
    realm,
    (client): void => {
      app.emit("disconnect", client);
    }
  );

  app.use(options.path, api);

  //use mountpath for WS server
  const customConfig = {
    ...config,
    path: Path.posix.join(app.path(), options.path, "/"),
  };

  const wss = new WebSocketServerWrapper({
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
