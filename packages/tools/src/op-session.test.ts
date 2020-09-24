import * as opSession from './op-session';

jest.mock('child_process');

describe('opSession', () => {
  it('is defined', () => {
    expect(opSession).toBeDefined();
  });
});
