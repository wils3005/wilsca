import * as z from 'zod';
import { LoggerOptions } from 'pino';
import { ServerOptions } from '@hapi/hapi';
import fs from 'fs';

const hostType = z
  .string()
  .refine(
    (s) => (/^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|localhost)$/.exec(s) || [])[0]
  );

const {
  HOST,
  PINO_OPTIONS,
  PORT,
  PROXIED,
  SERVER_OPTIONS,
  TLS_CERT,
  TLS_KEY,
} = z
  .object({
    HOST: hostType,
    PINO_OPTIONS: z.string(),
    PORT: z.string().refine((s) => Number(s) > 1024 && Number(s) < 65535),
    PROXIED: z.string(),
    PUBLIC_PATH: z.string().refine((s) => fs.statSync(s)),
    SERVER_OPTIONS: z.string(),
  })
  .nonstrict()
  .parse(process.env);

const cert = fs.readFileSync(TLS_CERT);
const key = fs.readFileSync(TLS_KEY);
const host = HOST;
const loggerOptions = JSON.parse(PINO_OPTIONS) as LoggerOptions;
const port = Number(PORT);
const proxied = Boolean(PROXIED);

const serverOptions = JSON.parse(SERVER_OPTIONS) as ServerOptions;

Object.assign(serverOptions.tls, {
  cert: fs.readFileSync(serverOptions?.tls?.cert),
});

export { cert, key, host, loggerOptions, port, proxied, serverOptions };
