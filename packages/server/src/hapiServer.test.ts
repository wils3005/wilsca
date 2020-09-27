import { onUnhandledRejection, start } from './hapiServer';
import { Server } from '@hapi/hapi';

describe('hapiServer', () => {
  describe('onUnhandledRejection', () => {
    Object.assign(process, { exit: jest.fn() });

    it("doesn't throw", () => {
      expect(() => onUnhandledRejection()).not.toThrow();
    });
  });

  describe('start', () => {
    it("doesn't throw", async () => {
      Object.assign(Server.prototype, { start: jest.fn() });

      return new Promise((done) => {
        expect(async () => await start()).not.toThrow();
        done();
      });
    });
  });
});
