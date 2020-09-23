import * as sw from './sw';

describe('log', () => {
  it("doesn't throw", () => {
    expect.hasAssertions();
    expect(sw).toBeDefined();
  });
});
