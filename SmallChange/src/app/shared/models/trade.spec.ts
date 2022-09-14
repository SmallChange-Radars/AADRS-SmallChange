import { Trade } from './trade';

describe('Trade', () => {
  it('should create an instance', () => {
    expect(new Trade('', '', '', [-1], -1)).toBeTruthy();
  });
});
