import { Server, ServerOptions } from '@hapi/hapi';
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
import basic from '@hapi/basic';
import hapiPino from 'hapi-pino';
import inert from '@hapi/inert';
import nes from '@hapi/nes';
import pino from 'pino';

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

function onUnhandledRejection(...args: unknown[]): void {
  console.error(...args);
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

export { onUnhandledRejection, start };
