jest.mock('child_process');

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn(() => Buffer.from('')),
    writeFileSync: jest.fn(),
  };
});

describe('aws-session', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./aws-session')).not.toThrow();
      done();
    });
  });
});
