import * as Zod from "zod";
import Express from "express";
import ExpressPinoLogger from "express-pino-logger";
import Pino from "pino";

class ExpressWrapper {
  readonly env = Zod.object({
    STATIC_PATH: Zod.string(),
  }).parse(process.env);

  readonly express: Express.Express = Express();
  readonly logger = Pino({ level: "debug", name: this.constructor.name });

  constructor() {
    this.logger.debug("constructor");
    this.express.use(ExpressPinoLogger({ logger: this.logger }));
    this.express.use(Express.static(this.env.STATIC_PATH));
    this.express.on("mount", () => this.logger.debug("mount"));
  }
}

export default ExpressWrapper;
