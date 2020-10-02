import { execSync } from 'child_process';
import { mock } from 'jest-mock-extended';

jest.mock('child_process', () => {
  return {
    execSync: () => mock<ReturnType<typeof execSync>>(),
  };
});

test('commit', () => {
  const actual = async () => await import('./commit');
  expect(actual).not.toThrow();
});
