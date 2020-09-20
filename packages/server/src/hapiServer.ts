import { Server, ServerOptions } from '@hapi/hapi';

import {
  cert,
  host,
  key,
  loggerOptions,
  port,
  proxied,
  relativeTo,
} from './env';

import basic from '@hapi/basic';
import hapiPino from 'hapi-pino';
import { plugin as healthz } from './plugins/healthz';
import inert from '@hapi/inert';
import { plugin as knex } from './plugins/knex';
import { plugin as models } from './plugins/models';
import nes from '@hapi/nes';
import { plugin as peerServer } from './plugins/peerServer';
import pino from 'pino';

const serverOptions: ServerOptions = {
  host,
  port,
  routes: {
    files: { relativeTo },
  },
  tls: { cert, key },
};

const server = new Server(serverOptions);

const plugins = [
  { plugin: basic, options: {} },
  { plugin: hapiPino, options: { instance: pino(loggerOptions) } },
  { plugin: healthz, options: {} },
  { plugin: inert, options: {} },
  { plugin: knex, options: {} },
  { plugin: models, options: {} },
  { plugin: nes, options: {} },
  { plugin: peerServer, options: { path: '/peer', proxied } },
];

function onUnhandledRejection(reason: unknown): void {
  console.error(reason);
  process.exit(1);
}

async function start(): Promise<void> {
  process.on('unhandledRejection', onUnhandledRejection);
  await server.register(plugins);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
      },
    },
  });

  await server.start();
  server.logger.info(`Server running at: ${server.info.uri}`);
}

export { server, onUnhandledRejection, start };
