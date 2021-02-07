import Express from "express";
import ExpressPinoLogger from "express-pino-logger";
import Path from "path";
import Pino from "pino";

function main(logger: Pino.Logger): Express.Express {
  const app = Express();
  app.use(ExpressPinoLogger({ logger }));
  // app.use(express.json());
  app.get("/healthz", (_req, res) => res.end());
  app.use(Express.static(Path.join(process.cwd(), "public")));
  return app;
}

export default main;
