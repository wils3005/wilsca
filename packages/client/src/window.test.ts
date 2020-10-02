jest.mock('./app');
jest.mock('./log');
jest.mock('./sw');

test('window', () => {
  const actual = async () => await import('./window');
  expect(actual).not.toThrow();
});

test('onLoad', async () => {
  const { onLoad } = await import('./window');
  const actual = () => onLoad();
  expect(actual).not.toThrow();
});
