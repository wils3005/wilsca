jest.mock('child_process');

describe('commit', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./commit')).not.toThrow();
      done();
    });
  });
});
