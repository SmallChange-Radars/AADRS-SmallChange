import { Activity } from './activity';
import { Stock } from './stock';

describe('Activity', () => {
  it('should create an instance', () => {
    expect(new Activity(new Stock("","",1,[1],""),1,1,"","")).toBeTruthy();
  });
});
