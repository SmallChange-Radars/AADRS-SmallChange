import { Stock } from './stock';

describe('Stock', () => {
  it('should create an instance', () => {
    expect(new Stock("","",1,[1],"")).toBeTruthy();
  });
});
