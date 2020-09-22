import { onLoad } from '../src';

describe('client', () => {
  describe('onLoad', () => {
    it("doesn't throw", () => {
      expect.hasAssertions();
      expect(() => onLoad()).not.toThrow();
    });
  });
});
