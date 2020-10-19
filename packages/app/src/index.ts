import * as z from "zod";
import { Server, ServerOptions, ServerRegisterPluginObject } from "@hapi/hapi";
import pino, { LoggerOptions } from "pino";
import { readFileSync, statSync } from "fs";
import basic from "@hapi/basic";
import hapiPino from "hapi-pino";
import healthz from "./healthz";
import inert from "@hapi/inert";
import { join } from "path";
import json from "./json";
import knex from "./knex";
import models from "./models";
import nes from "@hapi/nes";
import peerServer from "./peerServer";
import root from "./root";
import { start } from "repl";

const hostType = z
  .string()
  .refine(
    (s) => (/^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|localhost)$/.exec(s) || [])[0]
  );

const {
  CERT,
  HOST,
  KEY,
  NODE_ENV,
  PINO_OPTIONS,
  PORT,
  PROXIED,
  PUBLIC_PATH,
} = z
  .object({
    CERT: z.string(),
    HOST: hostType,
    KEY: z.string(),
    NODE_ENV: z.string(),
    PINO_OPTIONS: z.string(),
    PORT: z.string().refine((s) => Number(s) > 0 && Number(s) < 65535),
    PROXIED: z.string(),
    PUBLIC_PATH: z.string().refine((s) => statSync(s)),
  })
  .nonstrict()
  .parse(process.env);

const cert = readFileSync(join(process.cwd(), CERT));
const key = readFileSync(join(process.cwd(), KEY));
const host = HOST;
const loggerOptions = json().parse(JSON.parse(PINO_OPTIONS)) as LoggerOptions;
const port = Number(PORT);
const proxied = Boolean(PROXIED);
const publicPath = PUBLIC_PATH;

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

const plugins: ServerRegisterPluginObject<Record<PropertyKey, unknown>>[] = [
  { plugin: basic, options: {} },
  { plugin: hapiPino, options: { instance: pino(loggerOptions) } },
  { plugin: healthz, options: {} },
  { plugin: inert, options: {} },
  { plugin: knex, options: {} },
  { plugin: models, options: {} },
  { plugin: nes, options: {} },
  { plugin: peerServer, options: { path: "/peer", proxied } },
  { plugin: root, options: {} },
];

async function main(): Promise<void> {
  if (NODE_ENV == "development") {
    const { context } = start("repl > ");
    Object.assign(context, { server });
  }

  await server.register(plugins);
  await server.start();

  const {
    logger,
    info: { uri },
  } = server;

  logger.info(`Server running at: ${uri}`);
}

void main();

export default main;
