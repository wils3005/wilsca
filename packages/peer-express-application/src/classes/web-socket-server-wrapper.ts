import * as Zod from "zod";
import Client from "./client";
import Config from "../schemas/config";
import Errors from "../enums/errors";
import Events from "events";
import HTTP from "http";
import JSONObject from "../schemas/json-object";
import MessageType from "../enums/message-type";
import { MyWebSocket } from "../types";
import Realm from "./realm";
import URL from "url";
import WS from "ws";

class WebSocketServerWrapper extends Events.EventEmitter {
  private readonly realm: Realm;
  private readonly config: Config;
  public readonly socketServer: WS.Server;

  constructor(server: WS.Server, realm: Realm, config: Config) {
    super();
    this.setMaxListeners(0);
    this.realm = realm;
    // key, concurrentLimit, path
    this.config = Config.parse(config);
    this.socketServer = server;
    this.socketServer.on(
      "connection",
      (socket: WS, request: HTTP.IncomingMessage) => {
        console.log("****************************************");
        console.log("****************************************");
        this._onSocketConnection(socket, request);
      }
    );

    this.socketServer.on("error", (error: Error) => this._onSocketError(error));
  }

  private _onSocketConnection(
    socket: MyWebSocket,
    req: HTTP.IncomingMessage
  ): void {
    try {
      console.log("web-socket-server-wrapper _onSocketConnection");

      const { id, token, key } = Zod.object({
        id: Zod.string(),
        token: Zod.string(),
        key: Zod.string(),
      }).parse(Object.fromEntries(new URL.URL(req.url).searchParams));

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

        return this._configureWS(socket, client);
      }

      this._registerClient({ socket, id, token });
    } catch (error) {
      console.error(error);
      return this._sendErrorAndClose(socket, Errors.INVALID_WS_PARAMETERS);
    }
  }

  private _onSocketError(error: Error): void {
    // handle error
    this.emit("error", error);
  }

  private _registerClient({
    socket,
    id,
    token,
  }: {
    socket: MyWebSocket;
    id: string;
    token: string;
  }): void {
    // Check concurrent limit
    const clientsCount = this.realm.getClientsIds().length;

    if (clientsCount >= this.config.concurrentLimit) {
      return this._sendErrorAndClose(socket, Errors.CONNECTION_LIMIT_EXCEED);
    }

    const newClient: Client = new Client({ id, token });
    this.realm.setClient(newClient, id);
    socket.send(JSON.stringify({ type: MessageType.OPEN }));

    this._configureWS(socket, newClient);
  }

  private _configureWS(socket: MyWebSocket, client: Client): void {
    client.setSocket(socket);

    // Cleanup after a socket closes.
    socket.on("close", () => {
      if (client.getSocket() === socket) {
        this.realm.removeClientById(client.getId());
        this.emit("close", client);
      }
    });

    // Handle messages from peers.
    socket.on("message", (data: WS.Data) => {
      try {
        const message = JSONObject.parse(JSON.parse(String(data)));
        Object.assign(message, { src: client.getId() });

        this.emit("message", client, message);
      } catch (e) {
        this.emit("error", e);
      }
    });

    this.emit("connection", client);
  }

  private _sendErrorAndClose(socket: MyWebSocket, msg: Errors): void {
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
