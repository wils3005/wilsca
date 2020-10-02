import { mock } from 'jest-mock-extended';
import { start } from 'repl';
import { system } from 'faker';

jest.mock('repl', () => {
  return {
    start: () => mock<ReturnType<typeof start>>(),
  };
});

test('index', () => {
  const actual = async () => await import('.');
  expect(actual).not.toThrow();
});

test('addModuleToContext', async () => {
  const { addModuleToContext } = await import('.');
  const mockArgs = mock<Parameters<typeof addModuleToContext>>();
  const actual = () => addModuleToContext(...mockArgs);
  expect(actual).not.toThrow();
});

test('addModulesToContext', async () => {
  const { addModulesToContext } = await import('.');
  const mockArgs = mock<Parameters<typeof addModulesToContext>>([
    system.fileName(),
  ]);

  const actual = () => addModulesToContext(...mockArgs);
  expect(actual).not.toThrow();
});

test('isValidModuleName', async () => {
  const { isValidModuleName } = await import('.');
  const mockArgs = mock<Parameters<typeof isValidModuleName>>();
  const actual = () => isValidModuleName(...mockArgs);
  expect(actual).not.toThrow();
});
