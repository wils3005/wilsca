import Express from "express";
import ExpressPinoLogger from "express-pino-logger";
import Path from "path";
import Pino from "pino";

// TODO https://expressjs.com/en/guide/behind-proxies.html
function main(logger: Pino.Logger): Express.Express {
  const app = Express();
  app.use(ExpressPinoLogger({ logger }));
  // app.use(express.json());
  app.get("/healthz", (_req, res) => res.end());
  app.use(Express.static(Path.join(process.cwd(), "..", "browser", "public")));
  return app;
}

export default main;
