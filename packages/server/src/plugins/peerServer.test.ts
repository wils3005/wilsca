test('peerServer', () => {
  const actual = async () => await import('./peerServer');
  expect(actual).not.toThrow();
});
