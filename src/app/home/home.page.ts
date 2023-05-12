import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { OpenTriviaService } from '../services/open-trivia-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  difficulty: string = 'Medium';
  saveInfos: boolean = false;
  userName: string = '';
  errorMessage: string = '';
  isUserNameValid: boolean = false;
  
  constructor(
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private openTriviaService: OpenTriviaService,
    private router: Router
  ) { }

  ngOnInit(){
    this.saveInfos = false;
    this.userName = '';
    this.errorMessage = '';
    this.isUserNameValid = false;
  }

  navigate() {
    this.router.navigate(['/game', this.userName, this.difficulty])
  }

  checkUsername() {

    this.isUserNameValid = this.userName.length >= 3;
    this.errorMessage = 'Veuillez rentrer un pseudo de 3 caractères minimum';

    console.log('Pseudo : ' + this.userName)
    console.log('Difficulté : ' + this.difficulty);
    console.log('Save infos : ' + this.saveInfos);

    if (!this.isUserNameValid && this.difficulty == '') {
      this.showAlert();
    }
    else {

      this.navigate();
    }
  }

  async showAlert() {
    this.errorMessage = 'Veuillez rentrer un pseudo de 3 caractères minimum';

    const alert = await this.alertCtrl.create({
      header: 'Informations Manquantes',
      message: this.errorMessage,
    });

    alert.present();

  }
}
