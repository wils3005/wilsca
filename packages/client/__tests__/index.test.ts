import { handleLoad } from "../src";

describe("client", () => {
  describe("handleLoad", () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => handleLoad()).not.toThrow();
    });
  });
});
