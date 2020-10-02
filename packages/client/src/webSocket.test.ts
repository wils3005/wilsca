import { mock } from 'jest-mock-extended';

test('webSocket', () => {
  const actual = async () => await import('./webSocket');
  expect(actual).not.toThrow();
});

test('getWebSocket', async () => {
  const { getWebSocket } = await import('./webSocket');
  const actual = () => getWebSocket();
  expect(actual).not.toThrow();
});

test('onError', async () => {
  const { onError } = await import('./webSocket');
  const actual = () => onError.bind(mock<WebSocket>())();
  expect(actual).not.toThrow();
});

test('onMessage', async () => {
  const { onMessage } = await import('./webSocket');
  const actual = () => onMessage.bind(mock<WebSocket>())();
  expect(actual).not.toThrow();
});

test('onOpen', async () => {
  const { onOpen } = await import('./webSocket');
  const actual = () => onOpen.bind(mock<WebSocket>())();
  expect(actual).not.toThrow();
});

test('setWebSocket', async () => {
  const { setWebSocket } = await import('./webSocket');
  const actual = () => setWebSocket();
  expect(actual).not.toThrow();
});
