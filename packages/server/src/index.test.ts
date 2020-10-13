import { Server } from "@hapi/hapi";
import { mock } from "jest-mock-extended";

jest.mock("@hapi/hapi", () => {
  return {
    Server: function () {
      return {
        start: () => mock<ReturnType<typeof Server.prototype.start>>(),
      };
    },
  };
});

test("server", () => {
  expect(async () => await import(".")).not.toThrow();
});

test("server.getter", async () => {
  const { getter } = await import(".");
  expect(() => getter()).not.toThrow();
});

test("server.json", async () => {
  const { json } = await import(".");
  expect(() => json()).not.toThrow();
});

test("server.onUnhandledRejection", async () => {
  Object.assign(process, {
    exit: () => mock<ReturnType<typeof process.exit>>(),
  });

  const { onUnhandledRejection } = await import(".");
  expect(() => onUnhandledRejection()).not.toThrow();
});

test("main", async () => {
  const { main } = await import(".");
  expect(async () => await main()).not.toThrow();
});
