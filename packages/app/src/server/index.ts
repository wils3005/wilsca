import AppModule from "./app";
import KnexModule from "./knex";
import LoggerModule from "./logger";
import PeerServer from "./peer-server";
import ServerModule from "./server";
import User from "./user";

const logger = LoggerModule();
const knex = KnexModule();
const app = AppModule(logger);
const server = ServerModule(app);
const peerServer = PeerServer(server);

app.use("/foo", peerServer);

User.knex(knex);
