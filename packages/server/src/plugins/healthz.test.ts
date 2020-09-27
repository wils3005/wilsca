describe('healthz', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./healthz')).not.toThrow();
      done();
    });
  });
});
