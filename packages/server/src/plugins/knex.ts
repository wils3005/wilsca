import * as z from 'zod';
import Knex, { Config } from 'knex';
import { Plugin, Server } from '@hapi/hapi';
import Objection from 'objection';
import path from 'path';

const { NODE_ENV } = process.env;

const knexConfig: Config = {
  client: 'sqlite3',
  connection: {
    filename: path.join(process.cwd(), `${z.string().parse(NODE_ENV)}.sqlite3`),
  },
  useNullAsDefault: true,
};

const knex: Knex<Record<string, unknown>, unknown[]> = Knex(knexConfig);

const plugin: Plugin<unknown> = {
  name: 'knex',
  register,
};

function register(server: Server): void {
  Objection.Model.knex(knex);
  server.expose('knex', knex);
}

export { plugin, register };
