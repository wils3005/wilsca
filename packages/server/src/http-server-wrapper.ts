import * as Zod from "zod";
import Base, { LogLevel } from "./base";
import ExpressWrapper from "./express-wrapper";

class HTTPServerWrapper extends Base {
  readonly env = Zod.object({
    PORT: Zod.string(),
  }).parse(process.env);

  readonly express = new ExpressWrapper().express;
  readonly server = this.express.listen(this.env.PORT);

  constructor() {
    super();
    this.server.on("close", () => this.log("close"));
    this.server.on("connection", () => this.log("connection"));
    this.server.on("error", () => this.log("error", LogLevel.ERROR));
    this.server.on("listening", () => this.log("listening"));
    this.server.on("request", () => this.log("request"));
    this.server.on("upgrade", () => this.log("upgrade"));
  }
}

export default HTTPServerWrapper;
