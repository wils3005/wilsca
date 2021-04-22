import Path from "path";
import REPL from "repl";
import * as Zod from "zod";
import Express from "express";
import Knex from "knex";

class Server {
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

  express: Express.Express = Express();

  httpServer = this.express.listen(this.env.PORT);

  constructor() {
    this.express.use(Express.static(this.env.STATIC_PATH));
  }
}

Object.assign(REPL.start("repl> ").context, { app: new Server() });

export { Server };
