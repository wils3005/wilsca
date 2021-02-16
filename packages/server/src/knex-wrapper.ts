import * as Zod from "zod";
import Knex from "knex";
import Path from "path";
import Pino from "pino";
import User from "./user";

class KnexWrapper {
  readonly env = Zod.object({
    NODE_ENV: Zod.string(),
  }).parse(process.env);

  readonly knex = Knex({
    client: "sqlite3",
    connection: {
      filename: Path.join(process.cwd(), `${this.env.NODE_ENV}.sqlite3`),
    },
    useNullAsDefault: true,
  });

  readonly logger = Pino({ level: "debug", name: this.constructor.name });

  constructor() {
    this.logger.debug("constructor");
    User.knex(this.knex);
  }
}

export default KnexWrapper;
