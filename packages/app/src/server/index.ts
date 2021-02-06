import * as Peer from "peer";
import * as Zod from "zod";
import AppModule from "./app";
import KnexModule from "./knex";
import LoggerModule from "./logger";
import PeerServerModule from "./peer-server";
import User from "./user";

const { NODE_ENV, PORT } = Zod.object({
  NODE_ENV: Zod.string(),
  PORT: Zod.string(),
}).parse(process.env);

const peerClients: Set<Peer.IClient> = new Set();
const knex = KnexModule(NODE_ENV);
const logger = LoggerModule();
const app = AppModule(logger);
const server = app.listen(PORT);
const peerServer = PeerServerModule();

User.knex(knex);

export { NODE_ENV, PORT, app, knex, logger, peerClients, peerServer, server };
