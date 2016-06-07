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

  public timerInterval;
  public timer: number;
  @ViewChild('quizzSlider') public quizzSlider: Slides;

  public questionIndex: number = 0;

  constructor(private _nav: NavController, private _navParams: NavParams, private _http: Http) {
    this.quizzSlidesOptions = {
      onlyExternal: true,
      noSwiping: true
    };
  }

  public onPageLoaded() {
    this.timer = 30;
    this.quizzAnswers = [];
    this.quizz = this._navParams.get('quizz');
    console.log(this.quizz);
    this.startTimer();
  }

  public nextQuestion() {
    if (this.quizzSlider.isEnd()) {
      this.stopTimer();
      return;
    }

    let questionIndex = this.quizzSlider.getActiveIndex();
    this.quizzAnswers[questionIndex] = {
      questionid: this.quizz.quizQuestions[questionIndex].objectId,
      num: this.quizzAnswer
    };
    this.quizzSlider.slideNext(300, false);
    this.quizzAnswer = null;
    this.questionIndex = questionIndex + 1;
    this.timer = 30;

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

  private startTimer() {
    this.timerInterval = window.setInterval(() => {
      this.timer = this.timer - 1;
      if (this.timer === 0) {
        this.nextQuestion();
      }
    }, 1000);
  }

  private stopTimer() {
    window.clearInterval(this.timerInterval);
  }

  // public prevQuestion() {
  //   this.quizzAnswer = null;
  //   this.quizzAnswers[this._questionIndex] = this.quizzAnswer;
  //   this._questionIndex = this._questionIndex - 1;
  //   this.quizzSlider.slidePrev(300, false);
  // }
}
