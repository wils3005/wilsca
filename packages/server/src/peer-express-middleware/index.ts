import API from "./api";
import CheckBrokenConnections from "./check-broken-connections";
import Client from "./web-socket-wrapper";
import Config from "./config";
import Express from "express";
import HTTP from "http";
import Message from "./message";
import MessageHandler from "./message-handler";
import MessagesExpire from "./messages-expire";
import Path from "path";
import Realm from "./realm";
import WebSocketServerWrapper from "./web-socket-server-wrapper";

// receives HTTP.Server
// creates Express.Express
// creates Config
// creates Realm
// creates MessageHandler
// creates API
// creates MessagesExpire
// creates CheckBrokenConnections
// creates WebSocketServerWrapper
class PeerExpressMiddleware {
  server: HTTP.Server;
  app: Express.Express;
  config: Config;
  messageHandler: MessageHandler;
  realm: Realm;
  api: API;
  messagesExpire: MessagesExpire;
  checkBrokenConnections: CheckBrokenConnections;
  wss: WebSocketServerWrapper;

  static defaultConfig = {
    host: "::",
    port: 9000,
    expireTimeout: 5000,
    aliveTimeout: 60000,
    key: "peerjs",
    path: "/",
    concurrentLimit: 5000,
    allowDiscovery: false,
    cleanupOutMessages: 1000,
  };

  constructor(server: HTTP.Server) {
    this.server = server;
    this.app = Express();
    this.config = PeerExpressMiddleware.defaultConfig;
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
      this.config.aliveTimeout,
      (c) => this.app.emit("disconnect", c)
    );

    this.app.use(this.config.path, this.api.app);
    this.wss = new WebSocketServerWrapper(this.server, this.realm, {
      ...this.config,
      path: Path.posix.join(this.app.path(), this.config.path, "/"),
    });

    this.wss.on("connection", (c) => this.onConnection(c));
    this.wss.on("message", (c, m) => this.onMessage(c, m));
    this.wss.on("close", (c) => this.app.emit("disconnect", c));
    this.wss.on("error", (e) => this.app.emit("error", e));
    this.messagesExpire.startMessagesExpiration();
    this.checkBrokenConnections.start();
  }

  onConnection(client: Client): void {
    const messageQueue = this.realm.getMessageQueueById(client.getId());
    if (messageQueue) {
      let message: Message | undefined;
      while ((message = messageQueue.readMessage())) {
        this.messageHandler.handle(client, message);
      }

      this.realm.clearMessageQueue(client.getId());
    }

    this.app.emit("connection", client);
  }

  onMessage(client: Client, message: Message): void {
    this.app.emit("message", client, message);
    this.messageHandler.handle(client, message);
  }
}

export default PeerExpressMiddleware;
