import { Server } from "@hapi/hapi";
import { mock } from "jest-mock-extended";

test("index", () => {
  expect(async () => await import(".")).not.toThrow();
});

test("register", async () => {
  const { register } = await import(".");

  expect(() =>
    register(
      mock<Server>({ expose: () => mock<ReturnType<Server["expose"]>>() })
    )
  ).not.toThrow();
});
