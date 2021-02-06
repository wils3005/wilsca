import * as Zod from "zod";
import Express from "express";
import ExpressPinoLogger from "express-pino-logger";
import Logger from "./logger";
import Path from "path";
import PeerServer from "./peer-server";

function main(): Express.Express {
  const { PORT } = Zod.object({ PORT: Zod.string() }).parse(process.env);
  const app = Express();
  const server = app.listen(PORT);
  app.use(ExpressPinoLogger({ logger: Logger }));
  app.use("/foo", PeerServer(server));
  // app.use(express.json());
  app.get("/healthz", (_req, res) => res.end());
  app.use(Express.static(Path.join(process.cwd(), "public")));
  return app;
}

export default main;
