import * as z from "zod";
import Knex from "knex";
import path from "path";

const knex = Knex({
  client: "sqlite3",
  connection: {
    filename: path.join(
      process.cwd(),
      "db",
      `${z.string().parse(process.env.NODE_ENV)}.sqlite3`
    ),
  },
  useNullAsDefault: true,
});

export default knex;
