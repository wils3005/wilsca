test('index', () => {
  const actual = async () => await import('.');
  expect(actual).not.toThrow();
});
