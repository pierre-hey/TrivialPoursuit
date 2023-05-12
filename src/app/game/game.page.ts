import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia-service.service';
import { Question } from '../entities/question';
import { Answer } from '../entities/answer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  questionsTab: Question[] = [];
  questionIndex: number = 0;
  question?: Question;
  answers!: Answer[];
  answer!: Answer | undefined;
  userScore: number = 0;

  isCheckedResponse: boolean = false;
  isAnswerOK: boolean = false;
  isEnded: boolean = false;

  userName: string = '';
  difficulty: string = '';


  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private openTriviaService: OpenTriviaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.userName = this.activatedRoute.snapshot.params['userName'];

    this.getQuestionTab();
  }
  navigate() {
    this.router.navigate(['/score', this.userScore])
  }

  /**
   * Appelle le service pour récupérer l'ensemble des questions
   */
  async getQuestionTab() {
    try {
      //this.questionsTab = await this.openTriviaService.getQuestionTabPromise(this.difficulty);
      this.questionsTab = await this.openTriviaService.getQuestionsTabFromAPI(this.difficulty);
      this.getQuestion();
    }
    catch (error) {
      console.log('Une erreur est survenue');
      console.log(error);
    }

  }

  /**
 * Définit la question à afficher à partir de l'index du tableau de questions
 * @param index 
 */
  getQuestion() {
    this.question = this.questionsTab[this.questionIndex];
    this.answers = this.shuffleArray(this.question.answers);

    // console.log("###########################")
    // console.log(" getQuestion()")
    // console.log('Index : ' + this.questionIndex + ' - Question : ' + this.question.question);
    // console.log("###########################")
  }

  /**
*  Mélange un tableau
* @param array
* @returns 
*/
  private shuffleArray(array: Answer[]): Array<Answer> {
    return array.sort((a, b) => 0.5 - Math.random());
  }

  nextQuestion() {

    this.questionIndex++;
    this.answer = undefined;
    this.isCheckedResponse = false;

    console.log("questionIndex : " + this.questionIndex);
    console.log("questionsTab.length : " + this.questionsTab.length);

    if (this.questionIndex >= this.questionsTab.length) {

      this.isAnswerOK = false;
      this.questionIndex = 0;
      this.userScore = 0;
      this.userName = '';
    }

    if (this.questionIndex + 1 >= this.questionsTab.length) {
      this.isEnded = true;
    }

    this.getQuestion();

  }
  checkAnswer(ans: Answer) {

    this.answer = ans;
    this.isAnswerOK = ans === this.question?.correctAnswer;

    if (!this.isCheckedResponse) {
      this.isAnswerOK ? this.userScore++ : this.userScore;
      this.isCheckedResponse = true;
    }
    console.log('Réponse du joueur : ' + ans.answer + 'Bonne réponse : ' + this.isAnswerOK);
    console.log('Score du joueur : ' + this.userScore);
    this.showToast()
  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Votre score : ' + this.userScore + "/" + this.questionsTab.length,
      duration: 3000,

    });
    toast.present();
  }
}
