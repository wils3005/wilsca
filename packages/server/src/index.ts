import * as Zod from "zod";
import Client from "peer-express-application/dist/classes/client";
import ExpressWrapper from "./express-wrapper";
// import HTTPServerWrapper from "./http-server-wrapper";
import KnexWrapper from "./knex-wrapper";
import PeerExpressApplication from "peer-express-application";
import PinoWrapper from "./pino-wrapper";
import User from "./user";
import WS from "ws";

const { NODE_ENV, PORT } = Zod.object({
  NODE_ENV: Zod.string(),
  PORT: Zod.string(),
}).parse(process.env);

const peerClients: Set<Client> = new Set();
const knex = KnexWrapper(NODE_ENV);
const logger = PinoWrapper();
const rootApplication = ExpressWrapper(logger);
const httpServer = rootApplication.listen(PORT);
// const server = HTTPServerWrapper(rootApplication, PORT);
const wsServer = new WS.Server({
  path: "/peerjs",
  server: httpServer,
});

const peerApplication = PeerExpressApplication(wsServer);

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
};
