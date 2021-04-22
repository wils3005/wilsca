import path from "path";
import repl from "repl";
import fastify from "fastify";
import fastifyJWT from "fastify-jwt";
import fastifyOpenAPIGlue from "fastify-openapi-glue";
import fastifyStatic from "fastify-static";
// import fastifySwagger from "fastify-swagger";
import fastifyWebSocket from "fastify-websocket";
import * as zod from "zod";
import knex from "knex";
import { WebSocketHandler } from "./web-socket-handler";

class Server {
  env = zod
    .object({
      JWT_SECRET: zod.string(),
      NODE_ENV: zod.string(),
      PORT: zod.string(),
      STATIC_PATH: zod.string(),
    })
    .parse(process.env);

  fastify = fastify({ logger: true });

  knex = knex({
    client: "sqlite3",
    connection: {
      filename: path.join(process.cwd(), `${this.env.NODE_ENV}.sqlite3`),
    },
    useNullAsDefault: true,
  });

  constructor() {
    void this.fastify.register(fastifyStatic, {
      root: this.env.STATIC_PATH,
    });

    void this.fastify.register(fastifyJWT, {
      secret: this.env.JWT_SECRET,
    });

    void this.fastify.register(fastifyWebSocket);

    void this.fastify.register(fastifyOpenAPIGlue, {
      specification: `${process.cwd()}/swagger.json`,
      service: `${__dirname}/service.js`,
    });

    this.fastify.route({
      method: "GET",
      url: "/",
      handler: (_req, reply) => void reply.sendFile("index.html"),
      wsHandler: (c, r) => void new WebSocketHandler(c, r),
    });

    void this.fastify.listen(this.env.PORT);

    process
      .on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection", reason, p);
      })
      .on("uncaughtException", (error) => {
        console.error("Terminating process", error.stack);
        process.exit(1);
      });
  }
}

Object.assign(repl.start("repl> ").context, { app: new Server() });

export { Server };
