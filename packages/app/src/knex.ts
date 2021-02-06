import Knex, { Config } from "knex";
import { object, string } from "zod";
import { join } from "path";

const { NODE_ENV } = object({ NODE_ENV: string() })
  .nonstrict()
  .parse(process.env);

const knexConfig: Config = {
  client: "sqlite3",
  connection: {
    filename: join(process.cwd(), `${NODE_ENV}.sqlite3`),
  },
  useNullAsDefault: true,
};

const knex: Knex<Record<string, unknown>, unknown[]> = Knex(knexConfig);

export default knex;
