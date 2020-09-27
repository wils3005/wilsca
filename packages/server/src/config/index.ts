import { json, object, string } from '@wilsjs/zod';
import { readFileSync, statSync } from 'fs';
import { LoggerOptions } from 'pino';
import { join } from 'path';

const hostType = string().refine(
  (s) => (/^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|localhost)$/.exec(s) || [])[0]
);

const { HOST, PINO_OPTIONS, PORT, PROXIED, PUBLIC_PATH } = object({
  HOST: hostType,
  PINO_OPTIONS: string(),
  PORT: string().refine((s) => Number(s) > 0 && Number(s) < 65535),
  PROXIED: string(),
  PUBLIC_PATH: string().refine((s) => statSync(s)),
})
  .nonstrict()
  .parse(process.env);

const cert = readFileSync(join(__dirname, './localhost-cert.pem'));
const key = readFileSync(join(__dirname, './localhost-key.pem'));
const host = HOST;
const loggerOptions = json().parse(JSON.parse(PINO_OPTIONS)) as LoggerOptions;
const port = Number(PORT);
const proxied = Boolean(PROXIED);
const publicPath = PUBLIC_PATH;

export { cert, key, host, loggerOptions, port, proxied, publicPath };
