import API from "./api";
import CheckBrokenConnections from "../classes/check-broken-connections";
import Client from "../classes/client";
import Config from "../schemas/config";
import Express from "express";
import HTTP from "http";
import Message from "../schemas/message";
import MessageHandler from "../classes/message-handler";
import MessagesExpire from "../classes/messages-expire";
import Path from "path";
import Realm from "../classes/realm";
import WebSocketServer from "../classes/web-socket-server";

function main({
  app,
  server,
  options,
}: {
  app: Express.Application;
  server: HTTP.Server;
  options: Config;
}): void {
  const config = options;
  const realm: Realm = new Realm();
  const messageHandler = new MessageHandler(realm);

  const api = API({ config, realm, messageHandler });
  const messagesExpire: MessagesExpire = new MessagesExpire({
    realm,
    config,
    messageHandler,
  });
  const checkBrokenConnections = new CheckBrokenConnections({
    realm,
    config,
    onClose: (client) => {
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
      let message: Message | undefined;

      while ((message = messageQueue.readMessage())) {
        messageHandler.handle(client, message);
      }
      realm.clearMessageQueue(client.getId());
    }

    app.emit("connection", client);
  });

  wss.on("message", (client: Client, message: Message) => {
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
