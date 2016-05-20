import {Page, NavController, NavParams, Slides, Loading} from 'ionic-angular';
import {ViewChild} from 'angular2/core';
import {Http, Headers} from 'angular2/http';


/*
  Generated class for the QuizzStartPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/quizz-start/quizz-start.html',
})
export class QuizzStartPage {
  public quizz;
  public quizzSlidesOptions;
  public quizzAnswers;
  public quizzAnswer: string;
  @ViewChild('quizzSlider') public quizzSlider: Slides;

  private _questionIndex: number = 0;

  constructor(private _nav: NavController, private _navParams: NavParams, private _http: Http) {
    this.quizzSlidesOptions = {
      onlyExternal: true,
      noSwiping: true
    };
  }

  public onPageLoaded() {
    this.quizzAnswers = [];
    this.quizz = this._navParams.get('quizz');
    console.log(this.quizz);
  }

  public nextQuestion() {
    this.quizzAnswers[this._questionIndex] = {
      questionid: this.quizz.quizQuestions[this._questionIndex].objectId,
      num: this.quizzAnswer
    };
    this._questionIndex = this._questionIndex + 1;
    this.quizzSlider.slideNext(300, false);
    this.quizzAnswer = null;
  }

  public submitQuiz() {
    let quizAnswer = {
      "quizid": this.quizz.objectId,
      "answers": this.quizzAnswers
    };

    console.log(this.quizzAnswers);
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this._nav.present(loading);

    let headers = new Headers();
    headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.post(`https://api.parse.com/1/functions/submitQuiz`, JSON.stringify(quizAnswer), {
      headers: headers
    }).map(res => res.json())
      .subscribe(data => console.log(data),
      (err) => console.log(err),
      () => {
        console.log("Success");
        loading.dismiss();
      });
  }

  // public prevQuestion() {
  //   this.quizzAnswer = null;
  //   this.quizzAnswers[this._questionIndex] = this.quizzAnswer;
  //   this._questionIndex = this._questionIndex - 1;
  //   this.quizzSlider.slidePrev(300, false);
  // }
}
