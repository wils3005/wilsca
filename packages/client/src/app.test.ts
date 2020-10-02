import { mock } from 'jest-mock-extended';
import { render } from 'react-dom';

jest.mock('react-dom', () => {
  return { render: () => mock<ReturnType<typeof render>>() };
});

test('app', () => {
  const actual = async () => await import('./app');
  expect(actual).not.toThrow();
});

test('asdf', async () => {
  const { asdf } = await import('./app');
  const actual = () => asdf();
  expect(actual).not.toThrow();
});

test('Element', async () => {
  const { Element } = await import('./app');
  const actual = () => Element();
  expect(actual).not.toThrow();
});
