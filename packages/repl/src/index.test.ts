import { mock } from "jest-mock-extended";
import { start } from "repl";

jest.mock("repl", () => {
  return {
    start: () => mock<ReturnType<typeof start>>(),
  };
});

test("repl", () => {
  expect(async () => await import(".")).not.toThrow();
});

test("repl.addModuleToContext", async () => {
  const { addModuleToContext } = await import(".");
  const moduleName = "moduleName";
  const modulePath = "modulePath";
  expect(() => addModuleToContext(moduleName, modulePath)).not.toThrow();
});

test("repl.addModulesToContext", async () => {
  const { addModulesToContext } = await import(".");
  const fileName = "fileName";
  expect(() => addModulesToContext(fileName)).not.toThrow();
});

test("repl.isValidModuleName", async () => {
  const { isValidModuleName } = await import(".");
  const moduleName = "moduleName";
  expect(() => isValidModuleName(moduleName)).not.toThrow();
});
