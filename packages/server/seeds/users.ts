import Knex from 'knex';
import { string } from '@wilsjs/zod';

const { PASSWORD, USERNAME } = process.env;
const username = string().parse(USERNAME);
const password = string().parse(PASSWORD);

async function seed(knex: Knex): Promise<void> {
  try {
    await knex('users').del();
    await knex('users').insert({
      username,
      password,
    });

    for (let i = 1; i < 100000; i++) {
      const username = Math.random().toString();
      const password = Math.random().toString();

      await knex('users').insert({
        username,
        password,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export = seed;
