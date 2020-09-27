describe('User', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./User')).not.toThrow();
      done();
    });
  });
});
