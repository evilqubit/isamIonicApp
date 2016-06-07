import {Page, NavController, Loading, Alert} from 'ionic-angular';
import { Http, Headers } from 'angular2/http';

// Custom Imports
import { QuizzStartPage } from '../quizz-start/quizz-start';
/*
  Generated class for the QuizzesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/quizzes/quizzes.html',
})
export class QuizzesPage {
  public quizzes;
  constructor(private _nav: NavController, private _http: Http) { }

  public onPageLoaded() {
    this.getQuizzes();
  }

  public startQuiz(quizz) {
    let quizzStartConfirm = Alert.create({
      title: 'Start Quiz?',
      message: `You have selected ${quizz.quizName}, are you sure you would like to start it?`,
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            this._nav.pop();
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this._nav.push(QuizzStartPage, {
              quizz: quizz
            });
          }
        }
      ]
    });

    this._nav.present(quizzStartConfirm);
  }

  private getQuizzes() {
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this._nav.present(loading);

    let headers = new Headers();
    headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");
    this._http.get(`https://api.parse.com/1/classes/Quiz?where={
      "langId": 1,
      "status": 1
    }&include=quizQuestions`, {
        headers: headers
      }).map(res => res.json())
      .subscribe((data) => {
        this.quizzes = data.results;
      }, (error) => {
        console.log(error);
      }, () => {
        console.log("complete");
        loading.dismiss();
      });
  }
}

// "keys":"quizName,quizQuestions.questionText,quizQuestions.questionChoices"
