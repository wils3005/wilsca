import { execSync } from "child_process";
import { mock } from "jest-mock-extended";

jest.mock("child_process", () => {
  return {
    execSync: () => mock<ReturnType<typeof execSync>>(),
  };
});

test("vpn", () => {
  expect(async () => await import("./vpn")).not.toThrow();
});

test("isConnected", async () => {
  const { isConnected } = await import("./vpn");
  expect(() => isConnected()).not.toThrow();
});

test("main", async () => {
  const { main } = await import("./vpn");
  expect(() => main()).not.toThrow();
});
