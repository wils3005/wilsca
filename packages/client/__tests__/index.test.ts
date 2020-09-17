import { handleLoad } from "../src";

describe("log", () => {
  it("doesn't throw", () => {
    expect.hasAssertions();
    expect(() => handleLoad()).not.toThrow();
  });
});
