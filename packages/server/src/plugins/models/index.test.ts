describe('models', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('.')).not.toThrow();
      done();
    });
  });
});
