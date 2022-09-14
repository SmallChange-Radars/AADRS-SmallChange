import { Activity } from './activity';
import { Stock } from './stock';

describe('Activity', () => {
  it('should create an instance', () => {
    expect(new Activity("",1,1,"",new Date)).toBeTruthy();
  });
});
