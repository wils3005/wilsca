import { execSync } from "child_process";
import { mock } from "jest-mock-extended";

jest.mock("child_process", () => {
  return {
    execSync: () => mock<ReturnType<typeof execSync>>(),
  };
});

test("commit", () => {
  expect(async () => await import("./commit")).not.toThrow();
});
