import { Server, ServerOptions } from '@hapi/hapi';
import basic = require('@hapi/basic');
import hapiPino = require('hapi-pino');
import inert = require('@hapi/inert');
import nes = require('@hapi/nes');
import pino = require('pino');

import {
  cert,
  host,
  key,
  loggerOptions,
  port,
  proxied,
  publicPath,
} from './config';
import { healthz, knex, models, peerServer } from './plugins';

const serverOptions: ServerOptions = {
  host,
  port,
  routes: { files: { relativeTo: publicPath } },
  tls: {
    cert,
    key,
  },
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
