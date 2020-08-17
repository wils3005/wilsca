import * as bcrypt from "bcrypt";
import * as z from "zod";
import Knex from "knex";

const { PASSWORD, USERNAME } = process.env;
const username = z.string().parse(USERNAME);
const password = z.string().parse(PASSWORD);

export async function seed(knex: Knex): Promise<number[]> {
  return knex("users")
    .del()
    .then(async () =>
      knex("users").insert([
        {
          username,
          password: await bcrypt.hash(password, 10),
        },
      ])
    );
}
