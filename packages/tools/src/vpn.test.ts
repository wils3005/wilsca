import * as vpn from './vpn';

jest.mock('child_process');

describe('vpn', () => {
  it('is defined', () => {
    expect(vpn).toBeDefined();
  });
});
