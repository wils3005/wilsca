import * as z from "zod";
import { Plugin, Server } from "@hapi/hapi";
import Knex from "knex";
import Objection from "objection";
import path from "path";

const { NODE_ENV } = process.env;

const knexConfig: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: path.join(process.cwd(), `${z.string().parse(NODE_ENV)}.sqlite3`),
  },
  useNullAsDefault: true,
};

const knex = Knex(knexConfig);

const plugin: Plugin<unknown> = {
  name: "knex",
  register,
};

Objection.Model.knex(knex);

export default plugin;

export function register(server: Server): void {
  server.expose("knex", knex);
}
