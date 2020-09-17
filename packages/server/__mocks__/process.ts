import path from "path";
import process from "process";

const { env } = process;

Object.assign(env, {
  HOST: "localhost",
  NODE_ENV: "test",
  PINO_OPTIONS: "{}",
  PORT: "8443",
  PUBLIC_PATH: path.join(__dirname, "public"),
  TLS_CERT: path.join(process.cwd(), "localhost-cert.pem"),
  TLS_KEY: path.join(process.cwd(), "localhost-key.pem"),
});
