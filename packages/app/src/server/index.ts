import * as Peer from "peer";
import * as Zod from "zod";
import ExpressWrapper from "./express-wrapper";
import HTTPServerWrapper from "./http-server-wrapper";
import KnexWrapper from "./knex-wrapper";
import PeerWrapper from "./peer-wrapper";
import PinoWrapper from "./pino-wrapper";
import User from "./user";

const { NODE_ENV, PORT } = Zod.object({
  NODE_ENV: Zod.string(),
  PORT: Zod.string(),
}).parse(process.env);

const peerClients: Set<Peer.Client> = new Set();
const knex = KnexWrapper(NODE_ENV);
const logger = PinoWrapper();
const rootApplication = ExpressWrapper(logger);
const server = HTTPServerWrapper(rootApplication, PORT);

const peerApplication = PeerWrapper(server);

rootApplication.use("/p", peerApplication);
User.knex(knex);

export {
  NODE_ENV,
  PORT,
  knex,
  logger,
  peerApplication,
  peerClients,
  rootApplication,
  server,
};
