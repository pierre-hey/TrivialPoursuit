import { Answer } from './answer';

describe('Answer', () => {
  it('should create an instance', () => {
    expect(new Answer('correct answer', ['incorrect answer 1', 'incorrect answer 2'])).toBeTruthy();
  });
});