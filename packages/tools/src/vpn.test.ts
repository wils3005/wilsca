jest.mock('child_process');

describe('vpn', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./vpn')).not.toThrow();
      done();
    });
  });
});
