const { join } = require('path');

const development = {
  client: 'sqlite3',
  connection: { filename: 'development.sqlite3' },
  useNullAsDefault: true,
};

const test = {
  ...development,
  connection: { filename: ':memory:' },
  seeds: { directory: join(process.cwd(), 'seeds') },
};

const staging = {
  ...development,
  connection: { filename: 'staging.sqlite3' },
};

const production = {
  ...development,
  connection: { filename: 'production.sqlite3' },
};

export { development, test, staging, production };
