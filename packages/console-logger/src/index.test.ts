import { mock } from "jest-mock-extended";

test("console-logger", () => {
  expect(async () => await import(".")).not.toThrow();
});

test("console-logger.functionName(s)", async () => {
  const { functionName } = await import(".");
  const s = String(new Error().stack);
  expect(() => functionName(s)).not.toThrow();
});

test("console-logger.log()", async () => {
  const { log } = await import(".");
  expect(() => log()).not.toThrow();
});

test("console-logger.log(e)", async () => {
  const { log } = await import(".");
  const e = mock<Error>();
  expect(() => log(e)).not.toThrow();
});
