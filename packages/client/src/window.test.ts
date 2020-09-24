import { onLoad } from './window';

describe('window', () => {
  describe('onLoad', () => {
    it("doesn't throw", () => {
      expect(() => {
        onLoad();
      }).not.toThrow();
    });
  });
});
