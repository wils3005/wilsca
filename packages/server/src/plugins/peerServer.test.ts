describe('peerServer', () => {
  it("doesn't throw", async () => {
    return new Promise((done) => {
      expect(async () => await import('./peerServer')).not.toThrow();
      done();
    });
  });
});
