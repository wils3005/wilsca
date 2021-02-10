import * as Zod from "zod";
import ExpressPeerServer from "./peer";
import ExpressWrapper from "./express-wrapper";
import KnexWrapper from "./knex-wrapper";
import PinoWrapper from "./pino-wrapper";
import User from "./user";

const { NODE_ENV, PORT } = Zod.object({
  NODE_ENV: Zod.string(),
  PORT: Zod.string(),
}).parse(process.env);

const knex = KnexWrapper(NODE_ENV);
const logger = PinoWrapper();
const rootApplication = ExpressWrapper(logger);
const httpServer = rootApplication.listen(PORT);

const peerServer = ExpressPeerServer(httpServer);

rootApplication.use("/p", peerServer);
User.knex(knex);

export { NODE_ENV, PORT, knex, logger, rootApplication };
