import * as Zod from "zod";
import Express from "express";
import ExpressPinoLogger from "express-pino-logger";
import Knex from "knex";
import Path from "path";
import Pino from "pino";
import REPL from "repl";
import User from "./user";
import WebSocket from "ws";

class Application {
  env = Zod.object({
    NODE_ENV: Zod.string(),
    PORT: Zod.string(),
    STATIC_PATH: Zod.string(),
  }).parse(process.env);

  knex = Knex({
    client: "sqlite3",
    connection: {
      filename: Path.join(process.cwd(), `${this.env.NODE_ENV}.sqlite3`),
    },
    useNullAsDefault: true,
  });

  // level-change
  logger = Pino({
    redact: {
      paths: ["client.socket"],
    },
  });

  // mount
  app = Express();

  // close connection error listening upgrade
  httpServer = this.app.listen(this.env.PORT);

  // connection error headers close
  webSocketServer = this.createWebSocketServer();

  // close line pause resume SIGCONT SIGINT SIGTSTP exit reset
  replServer = REPL.start("repl> ");

  constructor() {
    this.app.use(ExpressPinoLogger({ logger: this.logger }));
    this.app.use(Express.json());
    this.app.get("/healthz", (_req, res) => res.end());
    this.app.use(Express.static(this.env.STATIC_PATH));

    User.knex(this.knex);
    Object.assign(this.replServer.context, { app: this });
    this.logger.info("Application.constructor");
  }

  createWebSocketServer(): WebSocket.Server {
    const server = new WebSocket.Server({ server: this.httpServer });
    server.on("connection", (socket, request) => {
      this.logger.info("Application.WebSocket.Server.connection", {
        socket,
        request,
      });
    });

    server.on("error", (error) =>
      this.logger.error("Application.WebSocket.Server.error", { error })
    );

    server.on("headers", (headers, request) =>
      this.logger.error("Application.WebSocket.Server.headers", {
        headers,
        request,
      })
    );

    server.on("close", (...args) =>
      this.logger.error("Application.WebSocket.Server.close", { ...args })
    );

    return new WebSocket.Server({ server: this.httpServer });
  }
}

new Application();

export {};
