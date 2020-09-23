import basic = require('@hapi/basic');
import hapiPino = require('hapi-pino');
import inert = require('@hapi/inert');
import nes = require('@hapi/nes');

import { plugin as healthz } from './healthz';
import { plugin as knex } from './knex';
import { plugin as models } from './models';
import { plugin as peerServer } from './peerServer';

export { basic, hapiPino, healthz, inert, knex, models, nes, peerServer };
