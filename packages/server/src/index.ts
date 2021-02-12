import * as Zod from "zod";
import Express from "express";
import ExpressPinoLogger from "express-pino-logger";
import HTTP from "http";
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
    SHELL: Zod.string().optional(),
    STATIC_PATH: Zod.string(),
  }).parse(process.env);

  knex = Knex({
    client: "sqlite3",
    connection: {
      filename: Path.join(process.cwd(), `${this.env.NODE_ENV}.sqlite3`),
    },
    useNullAsDefault: true,
  });

  logger = this.createLogger();
  app = this.createExpressApplication();
  httpServer = this.createHTTPServer();
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
    this.logger.info("application constructor");
  }

  createLogger(): Pino.Logger {
    const logger = Pino({
      redact: {
        paths: ["client.socket"],
      },
    });

    logger.on("level-change", () => this.logger.info("logger level-change"));
    return logger;
  }

  // mount
  createExpressApplication(): Express.Express {
    const app = Express();
    app.on("mount", () => this.logger.info("express application mount"));
    return app;
  }

  // close connection error listening request upgrade
  createHTTPServer(): HTTP.Server {
    const server = this.app.listen(this.env.PORT);
    server.on("close", () => this.logger.info("http server close"));
    server.on("connection", () => this.logger.info("http server connection"));
    server.on("error", () => this.logger.error("http server error"));
    server.on("listening", () => this.logger.info("http server listening"));
    server.on("request", () => this.logger.info("http server request"));
    server.on("upgrade", () => this.logger.info("http server upgrade"));
    return server;
  }

  // connection error headers close
  createWebSocketServer(): WebSocket.Server {
    const server = new WebSocket.Server({ server: this.httpServer });
    server.on("connection", () => {
      this.logger.info("websocket server connection");
    });

    server.on("error", (error) =>
      this.logger.error(
        `websocket server error\n${error.name}\n${error.message}`
      )
    );

    server.on("headers", () => this.logger.error("websocket server headers"));
    server.on("close", () => this.logger.error("websocket server close"));
    return server;
  }
}

new Application();

export {};
