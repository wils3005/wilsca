import * as commit from './commit';

jest.mock('child_process');

describe('commit', () => {
  it('is defined', () => {
    expect(commit).toBeDefined();
  });
});
