import * as z from 'zod';
import Knex from 'knex';

const { PASSWORD, USERNAME } = process.env;
const username = z.string().parse(USERNAME);
const password = z.string().parse(PASSWORD);

export async function seed(knex: Knex): Promise<void> {
  try {
    await knex('users').del();

    await knex('users').insert({
      username,
      password,
    });

    for (let i = 1; i < 100000; i++) {
      const username = String(Math.random());
      const password = String(Math.random());

      await knex('users').insert({
        username,
        password,
      });
    }
  } catch (e) {
    console.error(e);
  }
}
