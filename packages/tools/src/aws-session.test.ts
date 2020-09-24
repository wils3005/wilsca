import * as awsSession from './aws-session';

jest.mock('child_process');

jest.mock('fs', () => {
  return {
    readFileSync: jest.fn(() => Buffer.from('')),
    writeFileSync: jest.fn(),
  };
});

describe('awsSession', () => {
  it('is defined', () => {
    expect(awsSession).toBeDefined();
  });
});
