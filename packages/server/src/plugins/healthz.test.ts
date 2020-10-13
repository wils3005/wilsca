import { Request, ResponseToolkit, Server } from "@hapi/hapi";
import { mock } from "jest-mock-extended";

test("healthz", () => {
  expect(async () => await import("./healthz")).not.toThrow();
});

test("handler", async () => {
  const { handler } = await import("./healthz");

  expect(() =>
    handler(
      mock<Request>(),
      mock<ResponseToolkit>({
        response: () => mock<ReturnType<ResponseToolkit["response"]>>(),
      })
    )
  ).not.toThrow();
});

test("register", async () => {
  const { register } = await import("./healthz");

  expect(() =>
    register(
      mock<Server>({
        route: () => mock<ReturnType<Server["route"]>>(),
      })
    )
  ).not.toThrow();
});
