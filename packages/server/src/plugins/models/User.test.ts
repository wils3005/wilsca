test('User', () => {
  const actual = async () => await import('./User');
  expect(actual).not.toThrow();
});
