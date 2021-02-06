import * as Zod from "zod";
import Knex from "knex";
import Path from "path";

function main(): Knex {
  const { NODE_ENV } = Zod.object({ NODE_ENV: Zod.string() })
    .nonstrict()
    .parse(process.env);

  const knexConfig: Knex.Config = {
    client: "sqlite3",
    connection: {
      filename: Path.join(process.cwd(), `${NODE_ENV}.sqlite3`),
    },
    useNullAsDefault: true,
  };

  const knex: Knex<Record<string, unknown>, unknown[]> = Knex(knexConfig);

  return knex;
}

export default main;
