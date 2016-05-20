import {Page, NavController, Loading} from 'ionic-angular';
import {Http} from 'angular2/http';

declare var google;

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
  // public loadCenterMap: boolean = false;
  public map;
  public studentGradeDetail;

  constructor(private _nav: NavController, private _http: Http) {

  }

  public onPageLoaded() {
  }

  public searchForGrades() {
    if (!this.validate()) {
      return false;
    }
    if (this.studentNumber === "1020") {
      this.studentGradeDetail = null;
      let loader = Loading.create({
        content: "Loading map to Center",
        duration: 20000
      });

      this._nav.present(loader);

      this.getCenterLocation("SCH-1003");
      return false;
    } else if (this.studentNumber === "1000") {
      this.studentGradeDetail = null;
      let loader = Loading.create({
        content: "Loading map to Center",
        duration: 20000
      });
      this._nav.present(loader);

      this.getCenterLocation("SCH-104");
      return false;
    }

    let loading = Loading.create({
      content: "Fetching..."
    })

    this._nav.present(loading);

    this._http.get(`https://mehe.firebaseio.com/scores/${this.studentClass}/${this.studentNumber}.json`)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data, "From student detail");
        this.studentGradeDetail = data;
      }, (error) => {
        console.log(error);
      }, () => {
        console.log("complete");
        if (this.studentGradeDetail === null) {
          loading.dismiss();
          window.alert("Student not found!");
          return false;
        }
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

  private validate() {
    if (!this.studentClass || !this.studentNumber) {
      window.alert("Please fill all fields!");
      return false;
    }
    return true;
  }

  private getCenterLocation(centerId: string) {
    let location = null;
    this._http.get(`https://mehe.firebaseio.com/centers/${centerId}.json`)
      .map(res => res.json())
      .subscribe((centerInfo) => {
        location = {
          latitude: centerInfo.latitude,
          longitude: centerInfo.longitude,
          centerName: centerInfo.name
        };
      }, (error) => {
        console.log(error);
      }, () => {
        this.loadMap(location.latitude, location.longitude, location.centerName);
      });
  }

  private loadMap(latitude: number, longitude: number, centerName: string) {

    let latLng = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: mapOptions.center
    });

    let infowindow = new google.maps.InfoWindow({
      content: centerName
    });

    marker.addListener('click', function () {
      infowindow.open(this.map, marker);
    });

  }
}
