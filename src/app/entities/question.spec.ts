import { Answer } from './answer';
import { Question } from './question';

describe('Question', () => {
  it('should create an instance', () => {
    expect(new Question('category','type','diffculty','question',new Answer('',['']))).toBeTruthy();
  });
});
