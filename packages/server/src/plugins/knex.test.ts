test('knex', () => {
  const actual = async () => await import('./knex');
  expect(actual).not.toThrow();
});
