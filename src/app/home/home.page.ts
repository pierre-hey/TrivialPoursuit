import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia-service.service';
import { Question } from '../entities/question';
import { Answer } from '../entities/answer';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userName: string = '';
  errorMessage: string = '';
  isUserNameValid: boolean = false;
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  difficulty: string = '';
  saveInfos: boolean = false;

  question!: Question;
  answers!: Answer[];
  answer!: Answer | undefined;

  isAnswerOK: boolean = false;
  questionsTab: Question[] = [];
  questionIndex: number = 0;

  userScore: number = 0;
  isCheckedResponse: boolean = false;

  isEnded: boolean = false;
  isGameStarted: boolean = false;

  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private openTriviaService: OpenTriviaService) { }

  checkUsername() {

    this.isUserNameValid = this.userName.length >= 3;
    this.errorMessage = 'Veuillez rentrer un pseudo de 3 caractères minimum';

    console.log('Pseudo : ' + this.userName)
    console.log('Difficulté : ' + this.difficulty);
    console.log('Save infos : ' + this.saveInfos);

    if (!this.isUserNameValid) {
      this.showAlert();
    }

    this.getQuestionTab();

  }



  /**
   * Appelle le service pour récupérer l'ensemble des questions
   */
  async getQuestionTab() {
    try {
      //this.questionsTab = await this.openTriviaService.getQuestionTabPromise(this.difficulty);
      this.questionsTab = await this.openTriviaService.getQuestionsTabFromAPI(this.difficulty);
      
      this.getQuestion();
      this.isGameStarted = true;
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

    console.log("###########################")
    console.log(" getQuestion()")
    //this.isEnded = false;
    this.question = this.questionsTab[this.questionIndex];
    this.answers = this.shuffleArray(this.question.answers);

    console.log('Index : ' + this.questionIndex + ' - Question : ' + this.question.question);


    console.log("###########################")
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
      this.isUserNameValid = false;
    }

    if (this.questionIndex + 1 >= this.questionsTab.length) {
      this.isEnded = true;
      this.isGameStarted = false;
    }

    this.getQuestion();

  }

  checkAnswer(ans: Answer) {

    this.answer = ans;
    this.isAnswerOK = ans === this.question.correctAnswer;

    if (!this.isCheckedResponse) {
      this.isAnswerOK ? this.userScore++ : this.userScore;
      this.isCheckedResponse = true;
    }

   



    console.log('Réponse du joueur : ' + ans.answer + 'Bonne réponse : ' + this.isAnswerOK);
    console.log('Score du joueur : ' + this.userScore);
    this.showToast()
  }

  async showAlert() {
    this.errorMessage = 'Veuillez rentrer un pseudo de 3 caractères minimum';

    const alert = await this.alertCtrl.create({
      header: 'Informations Manquantes',
      message: this.errorMessage,
    });

    alert.present();

  }

  async showToast() {
    const toast = await this.toastCtrl.create({
      message: 'Votre score : ' + this.userScore + "/" + this.questionsTab.length,
      duration: 3000,

    });
    toast.present();
  }

}
