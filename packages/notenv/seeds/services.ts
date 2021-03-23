import { Knex } from "knex";
// import * as Zod from "zod";

const values = ["api", "karafka", "worker"];

async function seed(knex: Knex): Promise<void> {
  try {
    await knex("clusters").del();

    await knex("clusters").insert(values.map((value) => ({ value })));
  } catch (e) {
    console.error(e);
  }
}

export { seed };
