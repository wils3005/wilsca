import { createWriteStream } from 'fs';
import { mock } from 'jest-mock-extended';
import { spawn } from 'child_process';

jest.mock('child_process', () => {
  return {
    spawn: () => mock<ReturnType<typeof spawn>>(),
  };
});

jest.mock('fs', () => {
  return {
    createWriteStream: () => mock<ReturnType<typeof createWriteStream>>(),
  };
});

test('op-session', () => {
  const actual = async () => await import('./op-session');
  expect(actual).not.toThrow();
});
