import { Server } from "@hapi/hapi";
import { mock } from "jest-mock-extended";

test("knex", () => {
  expect(async () => await import("./knex")).not.toThrow();
});

test("register", async () => {
  const { register } = await import("./knex");
  expect(() => register(mock<Server>())).not.toThrow();
});
