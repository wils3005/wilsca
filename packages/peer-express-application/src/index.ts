import API from "functions/api";
import CheckBrokenConnections from "classes/check-broken-connections";
import Client from "classes/client";
import ClientMessage from "schemas/client-message";
import Config from "schemas/config";
import Express from "express";
import MessageHandler from "classes/message-handler";
import MessagesExpire from "classes/messages-expire";
import Path from "path";
import Realm from "classes/realm";
import WS from "ws";
import WebSocketServerWrapper from "classes/web-socket-server-wrapper";

function main(server: WS.Server, options?: Config): Express.Express {
  const app = Express();

  const newOptions = Config.parse({
    host: "::",
    port: 9000,
    expireTimeout: 5000,
    aliveTimeout: 60000,
    key: "peerjs",
    path: "/",
    concurrentLimit: 5000,
    allowDiscovery: false,
    proxied: false,
    cleanupOutMessages: 1000,
    ...options,
  });

  if (newOptions.proxied) {
    app.set(
      "trust proxy",
      newOptions.proxied === "false" ? false : !!newOptions.proxied
    );
  }

  app.on("mount", () => {
    if (!server) {
      throw new Error(
        "Server is not passed to constructor - " + "can't start PeerServer"
      );
    }

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
      ...newOptions,
      path: Path.posix.join(app.path(), options.path, "/"),
    };

    const wss = new WebSocketServerWrapper({
      server,
      realm,
      config: customConfig,
    });

    // TODO
    wss.on("connection", (client: Client) => {
      const messageQueue = realm.getMessageQueueById(client.getId());

      if (messageQueue) {
        let message: ClientMessage | undefined;

        while ((message = messageQueue.readMessage())) {
          messageHandler.handle(client, message);
        }
        realm.clearMessageQueue(client.getId());
      }

      // TODO
      app.emit("connection", client);
    });

    // TODO
    wss.on("message", (client: Client, message: ClientMessage) => {
      // TODO
      app.emit("message", client, message);
      messageHandler.handle(client, message);
    });

    // TODO
    wss.on("close", (client: Client) => {
      // TODO
      app.emit("disconnect", client);
    });

    // TODO
    wss.on("error", (error: Error) => {
      // TODO
      app.emit("error", error);
    });

    messagesExpire.startMessagesExpiration();
    checkBrokenConnections.start();
  });

  return app;
}

export default main;
