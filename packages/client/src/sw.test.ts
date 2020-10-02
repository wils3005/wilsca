import { mock } from 'jest-mock-extended';

test('sw', () => {
  const actual = async () => await import('./sw');
  expect(actual).not.toThrow();
});

test('addEventListeners', async () => {
  const { addEventListeners } = await import('./sw');
  const actual = () => addEventListeners();
  expect(actual).not.toThrow();
});

test('onContainerMessage', async () => {
  const { onContainerMessage } = await import('./sw');

  const actual = () =>
    onContainerMessage.bind(mock<ServiceWorkerContainer>())();

  expect(actual).not.toThrow();
});

test('onControllerChange', async () => {
  const { onControllerChange } = await import('./sw');

  const actual = () =>
    onControllerChange.bind(mock<ServiceWorkerContainer>())();

  expect(actual).not.toThrow();
});

test('onEvent', async () => {
  const { onEvent } = await import('./sw');
  const actual = () => onEvent();
  expect(actual).not.toThrow();
});

test('onRegistrationUpdateFound', async () => {
  const { onRegistrationUpdateFound } = await import('./sw');
  const actual = () =>
    onRegistrationUpdateFound.bind(mock<ServiceWorkerRegistration>())();

  expect(actual).not.toThrow();
});

test('register', async () => {
  const { register } = await import('./sw');
  const actual = () => register();
  expect(actual).not.toThrow();
});
