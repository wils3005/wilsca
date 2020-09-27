describe('knex', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./knex')).not.toThrow();
      done();
    });
  });
});
