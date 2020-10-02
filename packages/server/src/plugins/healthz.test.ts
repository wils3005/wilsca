test('healthz', () => {
  const actual = async () => await import('./healthz');
  expect(actual).not.toThrow();
});
