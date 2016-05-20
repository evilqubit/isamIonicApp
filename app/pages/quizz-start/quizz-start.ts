import {Page, NavController, NavParams, Slides} from 'ionic-angular';
import {ViewChild} from 'angular2/core';


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
  @ViewChild('quizzSlider') public quizzSlider: Slides;

  constructor(private _nav: NavController, private _navParams: NavParams) {
    this.quizzSlidesOptions = {
      onlyExternal: true,
      noSwiping: true
    };
  }

  public onPageLoaded() {
    this.quizz = this._navParams.get('quizz');
  }

  public nextQuestion() {
    this.quizzSlider.slideNext(300, false);
  }
}
