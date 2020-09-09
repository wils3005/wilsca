import { Plugin } from "@hapi/hapi";
import basic from "@hapi/basic";
import hapiPino from "hapi-pino";
import healthz from "./healthz";
import inert from "@hapi/inert";
import knex from "./knex";
import logger from "./logger";
import models from "./models";
import nes from "@hapi/nes";
import peerServer from "./peerServer";

const { PROXIED } = process.env;
const proxied = Boolean(PROXIED);

const plugins: Array<{
  plugin: Plugin<Record<string, unknown>>;
  options: unknown;
}> = [inert];

export default plugins;

// { plugin: basic, options: {} },
// { plugin: healthz, options: {} },
//
// { plugin: nes, options: {} },
// { plugin: hapiPino, options: { instance: logger } },
// { plugin: knex, options: {} },
// { plugin: models, options: {} },

// { plugin: peerServer, options: { path: "/peer", proxied } },
