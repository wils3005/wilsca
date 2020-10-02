import { error, info, log } from 'console';
import { join } from 'path';
import { mock } from 'jest-mock-extended';

Object.assign(console, {
  error: () => mock<ReturnType<typeof error>>(),
  info: () => mock<ReturnType<typeof info>>(),
  log: () => mock<ReturnType<typeof log>>(),
});

Object.assign(process.env, {
  HOST: 'localhost',
  NODE_ENV: 'test',
  OP_LOGIN_ADDRESS: 'http://localhost',
  PINO_OPTIONS: '{}',
  PORT: '8443',
  PROXIED: true,
  PUBLIC_PATH: join(process.cwd(), 'public'),
});
