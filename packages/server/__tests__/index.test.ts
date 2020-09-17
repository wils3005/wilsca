import main from "../src";

describe("server", () => {
  describe("main", () => {
    it("doesn't throw", () => {
      return new Promise(() => {
        expect(async () => await main()).not.toThrow();
      });
    });
  });
});
