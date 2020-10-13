import * as z from "zod";
import { Server, ServerOptions, ServerRegisterPluginObject } from "@hapi/hapi";
import { healthz, knex, models, peerServer } from "./plugins";
import pino, { LoggerOptions } from "pino";
import { readFileSync, statSync } from "fs";
import basic from "@hapi/basic";
import hapiPino from "hapi-pino";
import inert from "@hapi/inert";
import { join } from "path";
import nes from "@hapi/nes";

type JsonValue =
  | { [index: string]: JsonValue }
  | JsonValue[]
  | boolean
  | null
  | number
  | string;

type JsonObject = { [index: string]: JsonValue } | JsonValue[];

const jsonValue: z.ZodSchema<JsonValue> = z.lazy(getter);

const hostType = z
  .string()
  .refine(
    (s) => (/^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|localhost)$/.exec(s) || [])[0]
  );

const { CERT, HOST, KEY, PINO_OPTIONS, PORT, PROXIED, PUBLIC_PATH } = z
  .object({
    CERT: z.string(),
    HOST: hostType,
    KEY: z.string(),
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
];

function getter(): z.ZodTypeAny {
  return z.union([
    z.record(jsonValue),
    z.array(jsonValue),
    z.boolean(),
    z.null(),
    z.number(),
    z.string(),
  ]);
}

function json(): z.ZodSchema<JsonObject> {
  return z.lazy(() => z.union([z.record(jsonValue), z.array(jsonValue)]));
}

function onUnhandledRejection(...args: unknown[]): void {
  console.error(...args);
  process.exit(1);
}

async function main(): Promise<void> {
  try {
    process.on("unhandledRejection", onUnhandledRejection);
    await server.register(plugins);
    server.route({
      method: "GET",
      path: "/{param*}",
      handler: {
        directory: {
          path: ".",
          redirectToSlash: true,
        },
      },
    });

    await server.start();
    server.logger.info(`Server running at: ${server.info.uri}`);
  } catch (e) {
    console.error(e);
  }
}

void main();

export { getter, json, onUnhandledRejection, main };
