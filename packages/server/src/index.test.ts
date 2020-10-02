import { Server } from '@hapi/hapi';
import { mock } from 'jest-mock-extended';

jest.mock('@hapi/hapi', () => {
  return {
    Server: function () {
      return {
        start: () => mock<ReturnType<typeof Server.prototype.start>>(),
      };
    },
  };
});

test('index', () => {
  const actual = async () => await import('.');
  expect(actual).not.toThrow();
});
