import API from "./api";
import CheckBrokenConnections from "./check-broken-connections";
import Client from "./client";
import Config from "./schemas/config";
import Express from "express";
import HTTP from "http";
import Message from "./schemas/message";
import MessageHandler from "./message-handler";
import MessagesExpire from "./messages-expire";
import Path from "path";
import Realm from "./realm";
import WebSocketServer from "./web-socket-server";

class CreateInstance {
  server: HTTP.Server;
  app: Express.Application;
  config: Config;
  messageHandler: MessageHandler;
  realm: Realm;
  api: API;
  messagesExpire: MessagesExpire;
  checkBrokenConnections: CheckBrokenConnections;
  wss: WebSocketServer;

  constructor(server: HTTP.Server, app: Express.Application, config: Config) {
    this.server = server;
    this.app = app;
    this.config = config;
    this.realm = new Realm();
    this.messageHandler = new MessageHandler(this.realm);
    this.api = new API(this.realm, this.messageHandler, this.config);
    this.messagesExpire = new MessagesExpire(
      this.realm,
      this.messageHandler,
      this.config
    );

    this.checkBrokenConnections = new CheckBrokenConnections(
      this.realm,
      this.config,
      (client) => {
        this.app.emit("disconnect", client);
      }
    );

    this.app.use(this.config.path, this.api.app);

    //use mountpath for WS server
    const customConfig = {
      ...this.config,
      path: Path.posix.join(this.app.path(), this.config.path, "/"),
    };

    this.wss = new WebSocketServer({
      server: this.server,
      realm: this.realm,
      config: customConfig,
    });

    this.wss.on("connection", (client: Client) => {
      const messageQueue = this.realm.getMessageQueueById(client.getId());
      if (messageQueue) {
        let message: Message | undefined;
        while ((message = messageQueue.readMessage())) {
          this.messageHandler.handle(client, message);
        }

        this.realm.clearMessageQueue(client.getId());
      }

      app.emit("connection", client);
    });

    this.wss.on("message", (client: Client, message: Message) => {
      app.emit("message", client, message);
      this.messageHandler.handle(client, message);
    });

    this.wss.on("close", (client: Client) => {
      app.emit("disconnect", client);
    });

    this.wss.on("error", (error: Error) => {
      app.emit("error", error);
    });

    this.messagesExpire.startMessagesExpiration();
    this.checkBrokenConnections.start();
  }
}

export default CreateInstance;
