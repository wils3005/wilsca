import { join } from "path";

Object.assign(console, {
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
  warn: jest.fn(),
});

Object.assign(process.env, {
  CERT: "packages/server/localhost-cert.pem",
  HOST: "localhost",
  KEY: "packages/server/localhost-key.pem",
  NODE_ENV: "test",
  OP_LOGIN_ADDRESS: "http://localhost",
  PINO_OPTIONS: "{}",
  PORT: "8443",
  PROXIED: true,
  PUBLIC_PATH: join(process.cwd(), "public"),
});

export {};
