import { Knex } from "knex";

const values = [
  "stg-ghc",
  "stg-homehealth",
  "stg-hospital",
  "stg-pcc",
  "ghc",
  "homehealth",
  "hospital",
  "pcc",
  "pcc-sales",
  "training",
  "homehealth-ca",
  "hospital-ca",
  "dev-demo",
  "dev-int",
  "dev1",
  "dev2",
  "dev3",
  "pcc-clone",
  "dev-hsnf",
  "hlgx",
  "qa-hlgx",
];

async function seed(knex: Knex): Promise<void> {
  try {
    await knex("namespaces").del();

    await knex("namespaces").insert(values.map((value) => ({ value })));
  } catch (e) {
    console.error(e);
  }
}

export { seed };
