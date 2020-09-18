import * as z from "zod";
import fs from "fs";

const { HOST, PORT, PUBLIC_PATH, TLS_CERT, TLS_KEY } = process.env;

const cert = fs.readFileSync(String(TLS_CERT));
const key = fs.readFileSync(String(TLS_KEY));

const host = z
  .string()
  .refine((s) => /^((?:[0-9]{1,3}\.){3}[0-9]{1,3}|localhost)$/.exec(s), {
    message: `process.env.HOST = ${String(HOST)}`,
  })
  .parse(HOST);

const port = z
  .string()
  .refine((s) => Number(s) > 1024 && Number(s) < 65535, {
    message: `process.env.PORT = ${String(PORT)}`,
  })
  .parse(PORT);

const relativeTo = z
  .string()
  .refine(() => fs.statSync(String(PUBLIC_PATH)), {
    message: `process.env.PUBLIC_PATH = ${String(PUBLIC_PATH)}`,
  })
  .parse(PUBLIC_PATH);

export { cert, key, host, port, relativeTo };
