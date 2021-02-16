import * as Zod from "zod";
import ExpressWrapper from "./express-wrapper";
import Pino from "pino";

class HTTPServerWrapper {
  readonly env = Zod.object({
    PORT: Zod.string(),
  }).parse(process.env);

  readonly express = new ExpressWrapper().express;
  readonly logger = Pino({ level: "debug", name: this.constructor.name });
  readonly server = this.express.listen(this.env.PORT);

  constructor() {
    this.logger.debug("constructor");
    this.server.on("close", () => this.logger.debug("close"));
    this.server.on("connection", () => this.logger.debug("connection"));
    this.server.on("error", () => this.logger.error("error"));
    this.server.on("listening", () => this.logger.debug("listening"));
    this.server.on("request", () => this.logger.debug("request"));
    this.server.on("upgrade", () => this.logger.debug("upgrade"));
  }
}

export default HTTPServerWrapper;
