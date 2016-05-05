import {Page, NavController, Loading} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';

/*
  Generated class for the LookupGradesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/lookup-grades/lookup-grades.html',
})
export class LookupGradesPage {
  public studentNumber: string;
  public studentClass: string;
  public studentGradeDetail;

  constructor(private _nav: NavController, private _http: Http) {

  }

  public searchForGrades() {
    let loading = Loading.create({
      content: "Fetching..."
    })

    this._nav.present(loading);

    this._http.get(url, options)
      .map(res => res.json())
      .subscribe((data) => {
      }, (error) => {
        console.log(error);
      }, () => {
        console.log("complete");
      });
  }
}
