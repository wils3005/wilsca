import Knex from "knex";
import Path from "path";

function main(env: string): Knex {
  const knexConfig: Knex.Config = {
    client: "sqlite3",
    connection: {
      filename: Path.join(process.cwd(), `${env}.sqlite3`),
    },
    useNullAsDefault: true,
  };

  const knex: Knex<Record<string, unknown>, unknown[]> = Knex(knexConfig);
  return knex;
}

export default main;
