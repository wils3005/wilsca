import * as Zod from "zod";
import Express from "express";
import { ExpressPeerServer } from "@wilsjs/peerjs-server";
import ExpressPinoLogger from "express-pino-logger";
import HTTP from "http";
import KnexWrapper from "./knex-wrapper";
import Logger from "../shared/logger";
import REPL from "repl";

class Server {
  env = Zod.object({
    PORT: Zod.string(),
    REPL: Zod.string().optional(),
    STATIC_PATH: Zod.string(),
  }).parse(process.env);

  knex = new KnexWrapper().knex;
  peerServer;
  express: Express.Express = Express();
  httpServer: HTTP.Server;
  log = Logger.log.bind(this);

  constructor() {
    this.httpServer = this.express.listen(this.env.PORT);
    this.express.use(ExpressPinoLogger({ logger: Logger.pino }));
    this.express.use(Express.static(this.env.STATIC_PATH));

    this.peerServer = ExpressPeerServer(this.httpServer, { path: "/myapp" });
    this.express.use("/peerjs", this.peerServer);

    if (this.env.REPL) {
      Object.assign(REPL.start("repl> ").context, { app: this });
    }
  }
}

new Server();

export default Server;
