import { execSync } from 'child_process';
import { mock } from 'jest-mock-extended';

jest.mock('child_process', () => {
  return {
    execSync: () => mock<ReturnType<typeof execSync>>(),
  };
});

test('vpn', () => {
  const actual = async () => await import('./vpn');
  expect(actual).not.toThrow();
});

test('isConnected', async () => {
  const { isConnected } = await import('./vpn');
  const actual = () => isConnected();
  expect(actual).not.toThrow();
});

test('main', async () => {
  const { main } = await import('./vpn');
  const actual = () => main();
  expect(actual).not.toThrow();
});
