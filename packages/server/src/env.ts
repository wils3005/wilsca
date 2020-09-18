import * as z from "zod";
import fs from "fs";
import pino from "pino";

const hostType = z
  .string()
  .refine(
    (s) => (/^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|localhost)$/.exec(s) || [])[0]
  );

const { HOST, PINO_OPTIONS, PORT, PUBLIC_PATH, CERT, KEY } = z
  .object({
    CERT: z.string(),
    HOST: hostType,
    KEY: z.string(),
    PINO_OPTIONS: z.string(),
    PORT: z.string().refine((s) => Number(s) > 1024 && Number(s) < 65535),
    PUBLIC_PATH: z.string().refine((s) => fs.statSync(s)),
  })
  .nonstrict()
  .parse(process.env);

const cert = fs.readFileSync(CERT);
const key = fs.readFileSync(KEY);
const host = HOST;
const loggerOptions = JSON.parse(PINO_OPTIONS) as pino.LoggerOptions;
const port = Number(PORT);
const relativeTo = PUBLIC_PATH;

export { cert, key, host, loggerOptions, port, relativeTo };
