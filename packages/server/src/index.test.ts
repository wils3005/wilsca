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
  const { onUnhandledRejection } = await import('.');
  Object.assign(process, {
    exit: () => mock<ReturnType<typeof process.exit>>(),
  });

  const actual = () => onUnhandledRejection();
  expect(actual).not.toThrow();
});

test('main', async () => {
  const { main } = await import('.');
  const actual = async () => await main();
  expect(actual).not.toThrow();
});
