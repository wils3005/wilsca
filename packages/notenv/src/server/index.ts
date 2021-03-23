import Path from "path";
import REPL from "repl";
import * as Zod from "zod";
import Express from "express";
import Knex from "knex";
import WebSocket from "ws";
import { Config, Message } from "../shared";
// import * as Models from "./models";

class Server {
  env = Zod.object({
    NODE_ENV: Zod.string(),
    PORT: Zod.string(),
    REPL: Zod.string(),
    STATIC_PATH: Zod.string(),
  }).parse(process.env);

  config: Config;

  log: typeof Config.prototype.log;

  knex = Knex({
    client: "sqlite3",
    connection: {
      filename: Path.join(process.cwd(), `${this.env.NODE_ENV}.sqlite3`),
    },
    useNullAsDefault: true,
  });

  express: Express.Express = Express();

  httpServer = this.express.listen(this.env.PORT);

  webSocketServer = new WebSocket.Server({ server: this.httpServer });

  webSocket?: WebSocket;

  constructor(config: Config) {
    this.config = config;
    this.log = this.config.log.bind(this);

    // Object.values(Models).forEach((m) => m.knex(this.knex));

    this.express.use(Express.static(this.env.STATIC_PATH));

    this.webSocketServer.on("close", () => this.log("close"));
    this.webSocketServer.on("connection", (x) => this.connection(x));
    this.webSocketServer.on("error", () => this.log("error", "error"));
    this.webSocketServer.on("headers", () => this.log("headers"));

    if (this.env.REPL) {
      Object.assign(REPL.start("repl> ").context, { app: this });
    }
  }

  connection(socket: WebSocket): void {
    this.log("connection");

    socket.onclose = () => {
      this.log("close");
      this.webSocket = undefined;
    };

    socket.onerror = (event: WebSocket.ErrorEvent) => {
      this.log("error", "error");
      event.target.close();
      this.webSocket = undefined;
    };

    socket.onmessage = () => this.log("message");
    socket.onopen = () => this.log("open");
    this.webSocket = socket;
  }

  send(msg: Message): void {
    this.log("send");
    this.webSocket?.send(msg.toString());
  }
}

Object.assign(globalThis, { app: new Server(new Config()) });

export { Server };
