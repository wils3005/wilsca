import { Knex } from "knex";
// import * as Zod from "zod";

const values = [
  "dev-CA-eks",
  "dev-US-eks",
  "prod-CA-eks",
  "prod-US-eks",
  "prod-hlgx",
  "qa-hlgx",
  "stg-US-eks",
];

async function seed(knex: Knex): Promise<void> {
  try {
    await knex("clusters").del();

    await knex("clusters").insert(values.map((value) => ({ value })));
  } catch (e) {
    console.error(e);
  }
}

export { seed };
