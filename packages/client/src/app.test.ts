import { Element } from './app';

describe('app', () => {
  describe('Element', () => {
    it("doesn't throw", () => {
      expect(() => {
        Element();
      }).not.toThrow();
    });
  });
});
