import * as knex from "knex";
import * as zod from "zod";

const { env } = process;

const { PASSWORD, USERNAME } = zod
  .object({
    PASSWORD: zod.string(),
    USERNAME: zod.string(),
  })
  .parse(env);

async function seed(knex: knex): Promise<void> {
  try {
    await knex("users").del();

    await knex("users").insert({
      username: USERNAME,
      password: PASSWORD,
    });

    for (let i = 1; i < 1000; i++) {
      const username = Math.random().toString();
      const password = Math.random().toString();

      await knex("users").insert({
        username,
        password,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export { seed };
