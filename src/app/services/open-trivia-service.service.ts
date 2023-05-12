import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Answer } from '../entities/answer';
import { Question } from '../entities/question';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaService {


  numberQuestion: number = 100;
  urlTrivialBase = 'https://opentdb.com/api.php?amount=' + this.numberQuestion;

  //tabQuestions: Question[] = [];

  constructor(private http: HttpClient) {

  }

  /*
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
  */
// Normalement, utiliser any pour Promise<Any>
  getQuestionsTabFromAPI(difficulty: string): Promise<Question[]> {
    // https://opentdb.com/api.php?amount=2&difficulty=hard

    let url = this.urlTrivialBase + '&difficulty=' + difficulty.toLowerCase();
    console.log(url);
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (data: any) => {
          resolve(this.mapperQuestion(data))
        }, error: (err) => {
          reject('Error : ' + err);
        }
      });
    });
  }

  private mapperQuestion(data: any): Question[] {
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    console.log(data);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    let questionsTab: Question[] = [];
    let results: any[] = data.results;

    results.forEach(result => {
      
      let incorrect_answer_to_map: Answer[] = [];
      let all_answer: Answer[];
      
      let correct_answer_to_map: Answer = new Answer(result.correct_answer);
      let incorrect_answers: string[] = result.incorrect_answers;
      incorrect_answers.forEach(ans => {
        incorrect_answer_to_map.push(new Answer(ans));
      })

      all_answer = incorrect_answer_to_map;
      all_answer.push(correct_answer_to_map);

      let question: Question = new Question(result.category, result.type, result.difficulty, result.question, all_answer, correct_answer_to_map);

      questionsTab.push(question);
    });

    return questionsTab;



  }

}
