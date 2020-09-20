import { start } from '../src/hapiServer';

describe('hapiServer', () => {
  describe('start', () => {
    it("doesn't throw", () => {
      return new Promise(() => {
        expect(async () => await start()).not.toThrow();
      });
    });
  });
});
