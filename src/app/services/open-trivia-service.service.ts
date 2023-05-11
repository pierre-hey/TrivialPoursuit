import { Injectable } from '@angular/core';

import { Answer } from '../entities/answer';
import { Question } from '../entities/question';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {



  tabQuestions: Question[] = [];
  constructor() { }


  getQuestionTabPromise(difficulty: string): Promise<Question[]> {
    return new Promise<Question[]>((resolve, reject) => {

      const a1_q1: Answer = new Answer('1-The Salamander');
      const a2_q1: Answer = new Answer('2-The Dragon Slayer');
      const a3_q1: Answer = new Answer('3-The Dragon');
      const a4_q1: Answer = new Answer('4-The Demon');
      const answers_q1 = [a1_q1, a2_q1, a3_q1, a4_q1];

      const a1_q2: Answer = new Answer('False');
      const a2_q2: Answer = new Answer('True');
      const answers_q2 = [a1_q2, a2_q2];

      const q1 = new Question('Entertainment: Japanese Anime & Manga',
        'multiple', 'easy', 'In "Fairy Tail", what is the nickname of Natsu Dragneel?', answers_q1, a1_q1);

      const q2 = new Question('Entertainment: Video Games', 'boolean', 'medium',
       '"Return to Castle Wolfenstein" was the only game of the Wolfenstein series where you don&#039;t play as William "B.J." Blazkowicz',
        answers_q2, a1_q2);

      let tabQuestions = [q1, q2];
      resolve(tabQuestions);

    })

  }
}
