import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { mock } from 'jest-mock-extended';

jest.mock('child_process', () => {
  return {
    execSync: () => mock<ReturnType<typeof execSync>>(),
  };
});

jest.mock('fs', () => {
  return {
    readFileSync: () => mock<ReturnType<typeof readFileSync>>(),
    writeFileSync: () => mock<ReturnType<typeof writeFileSync>>(),
  };
});

test('aws-session', () => {
  const actual = async () => await import('./aws-session');
  expect(actual).not.toThrow();
});
