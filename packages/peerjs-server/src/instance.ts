import express from "express";
import path from "path";
import { Client } from "./models/client";
import { ClientMessage } from "./models/message";
import { Realm } from "./models/realm";
import { IRealm } from "./models/realm";
import { CheckBrokenConnections } from "./services/checkBrokenConnections";
import {
  ClientMessagesExpire,
  MessagesExpire,
} from "./services/messagesExpire";
import { IWebSocketServer, WebSocketServer } from "./services/webSocketServer";
import { MessageHandler } from "./messageHandler";
import { Api } from "./api";
import { IConfig } from "./config";
import WS from "ws";

export const createInstance = ({
  app,
  server,
  options,
}: {
  app: express.Application;
  server: WS.Server;
  options: IConfig;
}): void => {
  const config = options;
  const realm: IRealm = new Realm();
  const messageHandler = new MessageHandler(realm);

  const api = Api({ config, realm, messageHandler });
  const messagesExpire: ClientMessagesExpire = new MessagesExpire({
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
    path: path.posix.join(app.path(), options.path, "/"),
  };

  const wss: IWebSocketServer = new WebSocketServer({
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
};
