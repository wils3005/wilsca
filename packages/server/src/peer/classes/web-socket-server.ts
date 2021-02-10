import * as Zod from "zod";
import Client from "./client";
import Config from "../schemas/config";
import Errors from "../enums/errors";
import EventEmitter from "events";
import HTTP from "http";
import Message from "../schemas/message";
import MessageType from "../enums/message-type";
import MyWebSocket from "../schemas/my-web-socket";
import Realm from "./realm";
import URL from "url";
import WS from "ws";

const { HOST, PORT } = Zod.object({
  HOST: Zod.string(),
  PORT: Zod.string(),
}).parse(process.env);

interface IAuthParams {
  id?: string;
  token?: string;
  key?: string;
}

const WS_PATH = "peerjs";

class WebSocketServer extends EventEmitter {
  public readonly path: string;
  private readonly realm: Realm;
  private readonly config: Config;
  public readonly socketServer: WS.Server;

  constructor({
    server,
    realm,
    config,
  }: {
    server: HTTP.Server;
    realm: Realm;
    config: Config;
  }) {
    super();

    this.setMaxListeners(0);

    this.realm = realm;
    this.config = config;

    const path = this.config.path;
    this.path = `${path}${path.endsWith("/") ? "" : "/"}${WS_PATH}`;

    this.socketServer = new WS.Server({ path: this.path, server });

    this.socketServer.on("connection", (socket: MyWebSocket, req) =>
      this._onSocketConnection(socket, req)
    );
    this.socketServer.on("error", (error: Error) => this._onSocketError(error));
  }

  private _onSocketConnection(
    socket: MyWebSocket,
    req: HTTP.IncomingMessage
  ): void {
    const query = Object.fromEntries(
      new URL.URL(`http://${HOST}:${PORT}${String(req.url)}`).searchParams
    );

    const { id, token, key }: IAuthParams = query;

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

      return this._configureWS(socket, client);
    }

    this._registerClient({ socket, id, token });
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

    if (clientsCount >= this.config.concurrent_limit) {
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

export default WebSocketServer;
