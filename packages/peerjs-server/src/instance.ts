import express from "express";
import { Server } from "net";
import path from "path";
import { Client } from "./client";
import { IMessage } from "./message";
import { Realm, IRealm } from "./realm";

import { CheckBrokenConnections } from "./check-broken-connections";
import { IMessagesExpire, MessagesExpire } from "./messages-expire";
import { WebSocketServerWrapper } from "./web-socket-server-wrapper";
import { MessageHandler } from "./message-handler";
import { Api } from "./api";
import Config from "./schemas/config";

class Instance {
  webSocketServerWrapper: WebSocketServerWrapper;

  constructor({
    app,
    server,
    options,
  }: {
    app: express.Application;
    server: Server;
    options: Config;
  }) {
    {
      const config = options;
      const realm: IRealm = new Realm();
      const messageHandler = new MessageHandler(realm);

      const api = Api({ config, realm, messageHandler });
      const messagesExpire: IMessagesExpire = new MessagesExpire({
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

      app.use(String(options.path), api);

      //use mountpath for WS server
      const customConfig = {
        ...config,
        path: path.posix.join(app.path(), options.path, "/"),
      };

      this.webSocketServerWrapper = new WebSocketServerWrapper({
        server,
        realm,
        config: customConfig,
      });

      this.webSocketServerWrapper.on("connection", (client: Client) => {
        const messageQueue = realm.getMessageQueueById(client.getId());

        if (messageQueue) {
          let message: IMessage | undefined;

          while ((message = messageQueue.readMessage())) {
            messageHandler.handle(client, message);
          }
          realm.clearMessageQueue(client.getId());
        }

        app.emit("connection", client);
      });

      this.webSocketServerWrapper.on(
        "message",
        (client: Client, message: IMessage) => {
          app.emit("message", client, message);
          messageHandler.handle(client, message);
        }
      );

      this.webSocketServerWrapper.on("close", (client: Client) => {
        app.emit("disconnect", client);
      });

      this.webSocketServerWrapper.on("error", (error: Error) => {
        app.emit("error", error);
      });

      messagesExpire.startMessagesExpiration();
      checkBrokenConnections.start();
    }
  }
}

export default Instance;
