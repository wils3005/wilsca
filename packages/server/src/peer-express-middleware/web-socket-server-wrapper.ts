import * as Zod from "zod";
import Client from "./web-socket-wrapper";
import Config from "./config";
import Errors from "./errors";
import EventEmitter from "events";
import HTTP from "http";
import Message from "./message";
import MessageType from "./message-handler/message-type";
import Pino from "pino";
import Realm from "./realm";
import URL from "url";
import WebSocket from "ws";

const { HOST, PORT } = Zod.object({
  HOST: Zod.string(),
  PORT: Zod.string(),
}).parse(process.env);

// const WS_PATH = "peerjs";

// receives HTTP.Server
// receives Realm
// creates WebSocket.Server
// creates WebSocket (via event)
// creates Client (via event)
class WebSocketServerWrapper extends EventEmitter {
  httpServer: HTTP.Server;
  realm: Realm;
  config: Config;
  logger: Pino.Logger;
  webSocketServer: WebSocket.Server;

  constructor(
    httpServer: HTTP.Server,
    realm: Realm,
    config: Config,
    logger: Pino.Logger
  ) {
    super();
    this.httpServer = httpServer;
    this.realm = realm;
    this.config = config;
    this.logger = logger;
    this.setMaxListeners(0);
    this.webSocketServer = new WebSocket.Server({
      path: this.config.path,
      server: httpServer,
    });

    this.webSocketServer.on("connection", (s, r) => this.onConnection(s, r));
    this.webSocketServer.on("error", (e) => this.onError(e));
    this.logger.info("WebSocketServerWrapper.constructor");
  }

  onConnection(socket: WebSocket, req: HTTP.IncomingMessage): void {
    this.logger.info("WebSocketServerWrapper.onConnection");
    const { id, token, key } = Object.fromEntries(
      new URL.URL(`http://${HOST}:${PORT}${String(req.url)}`).searchParams
    );

    if (!id || !token || !key) {
      return this._sendErrorAndClose(socket, Errors.INVALID_WS_PARAMETERS);
    }

    if (key !== this.config.key) {
      return this._sendErrorAndClose(socket, Errors.INVALID_KEY);
    }

    const client = this.realm.getClientById(id);

    if (client) {
      if (token !== client.getToken()) {
        // ID-taken, invalid token
        socket.send(
          JSON.stringify({
            type: MessageType.ID_TAKEN,
            payload: { msg: "ID is taken" },
          })
        );

        return socket.close();
      }

      return this._configureWebSocket(socket, client);
    }

    // Check concurrent limit
    const clientsCount = this.realm.getClientsIds().length;

    if (clientsCount >= this.config.concurrentLimit) {
      return this._sendErrorAndClose(socket, Errors.CONNECTION_LIMIT_EXCEED);
    }

    const newClient = new Client(id, token);
    this.realm.setClient(newClient, id);
    socket.send(JSON.stringify({ type: MessageType.OPEN }));

    this._configureWebSocket(socket, newClient);
  }

  onError(error: Error): void {
    this.logger.info("WebSocketServerWrapper.onError");
    this.emit("error", error);
  }

  _configureWebSocket(socket: WebSocket, client: Client): void {
    this.logger.info("WebSocketServerWrapper._configureWebSocket");
    client.setSocket(socket);

    // Cleanup after a socket closes.
    socket.on("close", () => {
      if (client.getSocket() === socket) {
        this.realm.removeClientById(client.getId());
        this.emit("close", client);
      }
    });

    // Handle messages from peers.
    socket.on("message", (data: WebSocket.Data) => {
      try {
        const s = String(data);
        const message = Message.parse(JSON.parse(s));

        message.src = client.getId();

        this.emit("message", client, message);
      } catch (e) {
        this.emit("error", e);
      }
    });

    this.emit("connection", client);
  }

  _sendErrorAndClose(socket: WebSocket, msg: Errors): void {
    this.logger.info("WebSocketServerWrapper._sendErrorAndClose");
    socket.send(
      JSON.stringify({
        type: MessageType.ERROR,
        payload: { msg },
      })
    );

    socket.close();
  }
}

export default WebSocketServerWrapper;
