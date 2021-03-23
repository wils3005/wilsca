import { Knex } from "knex";
// import * as Zod from "zod";

const values = ["development", "test", "production"];

async function seed(knex: Knex): Promise<void> {
  try {
    await knex("environments").del();
    await knex("environments").insert(values.map((value) => ({ value })));
  } catch (e) {
    console.error(e);
  }
}

export { seed };
