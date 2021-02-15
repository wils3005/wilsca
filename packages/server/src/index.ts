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

  // close line pause resume SIGCONT SIGINT SIGTSTP exit reset
  replServer = REPL.start("repl> ");

  private _express?: Express.Express;
  private _httpServer?: HTTP.Server;
  private _knex?: Knex;
  private _logger?: Pino.Logger;
  private _webSocketServer?: WebSocket.Server;

  constructor() {
    User.knex(this.knex);
    Object.assign(this.replServer.context, { app: this });
    this.webSocketServer;
    this.logger.info("application constructor");
  }

  get express(): Express.Express {
    if (this._express) return this._express;

    const express = Express();
    express.use(ExpressPinoLogger({ logger: this.logger }));
    express.use(Express.static(this.env.STATIC_PATH));
    express.on("mount", () => this.logger.info("express mount"));
    return (this._express = express);
  }

  get httpServer(): HTTP.Server {
    if (this._httpServer) return this._httpServer;

    const server = this.express.listen(this.env.PORT);
    server.on("close", () => this.logger.info("httpServer close"));
    server.on("connection", () => this.logger.info("httpServer connection"));
    server.on("error", () => this.logger.error("httpServer error"));
    server.on("listening", () => this.logger.info("httpServer listening"));
    server.on("request", () => this.logger.info("httpServer request"));
    server.on("upgrade", () => this.logger.info("httpServer upgrade"));
    return (this._httpServer = server);
  }

  get knex(): Knex {
    if (this._knex) return this._knex;

    const knex = Knex({
      client: "sqlite3",
      connection: {
        filename: Path.join(process.cwd(), `${this.env.NODE_ENV}.sqlite3`),
      },
      useNullAsDefault: true,
    });

    return (this._knex = knex);
  }

  get logger(): Pino.Logger {
    if (this._logger) return this._logger;

    const logger = Pino({
      redact: {
        paths: ["client.socket"],
      },
    });

    logger.on("level-change", () => logger.info("logger level-change"));
    return (this._logger = logger);
  }

  get webSocketServer(): WebSocket.Server {
    if (this._webSocketServer) return this._webSocketServer;

    const wss = new WebSocket.Server({ server: this.httpServer });
    wss.on("connection", (s) => this.onConnection(s));
    wss.on("error", () => this.logger.error("webSocketServer error"));
    wss.on("headers", () => this.logger.error("webSocketServer headers"));
    wss.on("close", () => this.logger.error("webSocketServer close"));
    return (this._webSocketServer = wss);
  }

  // (webSocket: WebSocket, request: HTTP.IncomingMessage)
  onConnection(webSocket: WebSocket): void {
    this.logger.info("webSocketServer connection");
    webSocket.onclose = (ev) => this.logger.info(ev);
    webSocket.onerror = (ev) => this.logger.info(ev);
    webSocket.onmessage = (ev) => this.onMessage(ev);
    webSocket.onopen = (ev) => this.logger.info(ev);
  }

  onMessage(event: WebSocket.MessageEvent): void {
    const { data, target } = event;
    this.logger.info(JSON.parse(String(data)));
    this.webSocketServer.clients.forEach((ws) => {
      if (ws == target) return;

      ws.send(data);
    });
  }
}

new Application();

export {};
