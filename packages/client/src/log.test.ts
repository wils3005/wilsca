import { log } from '../src/log';

describe('log', () => {
  it("doesn't throw", () => {
    expect.hasAssertions();
    expect(() => log()).not.toThrow();
  });
});
