import "mocha";
import { JSDOM } from "jsdom";
import assert from "assert";
import log from "../src/log";

beforeEach(() => {
  const jsdom = new JSDOM("", { url: "https://example.org/" });
  Object.assign(globalThis, jsdom.window);
});

describe("log", () => {
  it("doesn't throw", () => {
    assert.doesNotThrow(() => {
      log();
    });
  });
});
