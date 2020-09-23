import path = require('path');
import process = require('process');

const { env } = process;

Object.assign(env, {
  HOST: 'localhost',
  NODE_ENV: 'test',
  PINO_OPTIONS: '{}',
  PORT: '8443',
  PROXIED: true,
  PUBLIC_PATH: path.join(__dirname, 'public'),
});
