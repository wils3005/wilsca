import path = require('path');
import process = require('process');

const { env } = process;

Object.assign(env, {
  HOST: 'localhost',
  NODE_ENV: 'test',
  OP_LOGIN_ADDRESS: 'http://localhost',
  PINO_OPTIONS: '{}',
  PORT: '8443',
  PROXIED: true,
  PUBLIC_PATH: path.join(__dirname, 'public'),
});
