import path from "path";

const development = {
  client: "sqlite3",
  connection: { filename: "development.sqlite3" },
  migrations: {
    extension: "ts",
  },
  seeds: { directory: path.join(process.cwd(), "seeds") },
  useNullAsDefault: true,
};

const test = {
  ...development,
  connection: { filename: ":memory:" },
};

const staging = {
  ...development,
  connection: { filename: "staging.sqlite3" },
};

const production = {
  ...development,
  connection: { filename: "production.sqlite3" },
};

export { development, test, staging, production };
