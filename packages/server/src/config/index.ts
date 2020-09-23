import fs = require('fs');
import * as z from 'zod';
import { LoggerOptions } from 'pino';
import cert = require('./localhost-cert.pem');
import key = require('./localhost-key.pem');

const hostType = z
  .string()
  .refine(
    (s) => (/^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|localhost)$/.exec(s) || [])[0]
  );

const { HOST, PINO_OPTIONS, PORT, PROXIED, PUBLIC_PATH } = z
  .object({
    HOST: hostType,
    PINO_OPTIONS: z.string(),
    PORT: z.string().refine((s) => Number(s) > 0 && Number(s) < 65535),
    PROXIED: z.string(),
    PUBLIC_PATH: z.string().refine((s) => fs.statSync(s)),
  })
  .nonstrict()
  .parse(process.env);

const host = HOST;
const loggerOptions = JSON.parse(PINO_OPTIONS) as LoggerOptions;
const port = Number(PORT);
const proxied = Boolean(PROXIED);
const publicPath = PUBLIC_PATH;

export { cert, key, host, loggerOptions, port, proxied, publicPath };
