test('log', () => {
  const actual = async () => await import('./log');
  expect(actual).not.toThrow();
});

test('log()', async () => {
  const { log } = await import('./log');
  const actual = () => log();
  expect(actual).not.toThrow();
});
