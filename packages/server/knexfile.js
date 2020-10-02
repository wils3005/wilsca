const { join } = require('path');

const development = {
  client: 'sqlite3',
  connection: {
    filename: 'development.sqlite3',
  },
  useNullAsDefault: true,
};

const test = {
  client: 'sqlite3',
  connection: {
    filename: ':memory:',
  },
  useNullAsDefault: true,
  seeds: {
    directory: join(__dirname, 'seeds'),
  },
};

const staging = {
  client: 'sqlite3',
  connection: {
    filename: 'staging.sqlite3',
  },
  useNullAsDefault: true,
};

const production = {
  client: 'sqlite3',
  connection: {
    filename: 'production.sqlite3',
  },
  useNullAsDefault: true,
};

export { development, test, staging, production };
