import Knex, { Config } from "knex";
import { Plugin, Server } from "@hapi/hapi";
import { Model } from "objection";
import { join } from "path";
import { string } from "zod";

const { NODE_ENV } = process.env;

const knexConfig: Config = {
  client: "sqlite3",
  connection: {
    filename: join(process.cwd(), `${string().parse(NODE_ENV)}.sqlite3`),
  },
  useNullAsDefault: true,
};

const knex: Knex<Record<string, unknown>, unknown[]> = Knex(knexConfig);

const plugin: Plugin<unknown> = {
  name: "knex",
  register,
};

function register(server: Server): void {
  Model.knex(knex);
  server.expose("knex", knex);
}

export default plugin;
export { register };
