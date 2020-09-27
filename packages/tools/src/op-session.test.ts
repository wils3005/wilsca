jest.mock('child_process');

describe('op-session', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./op-session')).not.toThrow();
      done();
    });
  });
});
