import { mock } from 'jest-mock-extended';

test('peerServer', () => {
  const actual = async () => await import('./peerServer');
  expect(actual).not.toThrow();
});

test('register', async () => {
  const { register } = await import('./peerServer');
  type P = Parameters<typeof register>;
  const mockArgs: P = mock<P>([{ logger: {} }]);
  const actual = () => register(...mockArgs);
  expect(actual).not.toThrow();
});
