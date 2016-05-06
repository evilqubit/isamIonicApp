import {Page, NavController, Loading} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';

/*
  Generated class for the LookupGradesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/lookup-grades/lookup-grades.html'
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

    this._http.get(`https://mehe.firebaseio.com/scores/${this.studentClass}/${this.studentNumber}.json`)
      .map(res => res.json())
      .subscribe((data) => {
        this.studentGradeDetail = data;
      }, (error) => {
        console.log(error);
      }, () => {
        console.log("complete");
        this.getSchoolInfo(this.studentGradeDetail.schoolID, loading);
      });
  }


  private getSchoolInfo(schoolId, loader) {
    this._http.get(`https://mehe.firebaseio.com/schools/${schoolId}.json`)
      .map(res => res.json())
      .subscribe((school) => {
        this.studentGradeDetail.schoolName = school.schoolName;
        console.log(school);
      }, (error) => {
        console.log(error);
      }, () => {
        loader.dismiss();
        console.log("complete");
      });
  }
}
