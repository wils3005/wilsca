test('index', () => {
  const actual = async () => await import('.');
  expect(actual).not.toThrow();
});

test('json', async () => {
  const { json } = await import('.');
  const actual = () => json();
  expect(actual).not.toThrow();
});
