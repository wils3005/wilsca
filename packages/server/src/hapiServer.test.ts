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

test('onUnhandledRejection', async () => {
  const { onUnhandledRejection } = await import('./hapiServer');
  Object.assign(process, {
    exit: () => mock<ReturnType<typeof process.exit>>(),
  });

  const actual = () => onUnhandledRejection();
  expect(actual).not.toThrow();
});

test('start', async () => {
  const { start } = await import('./hapiServer');
  const actual = async () => await start();
  expect(actual).not.toThrow();
});
