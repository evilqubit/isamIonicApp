import {NavController, Loading} from 'ionic-angular';
import {Http} from '@angular/http';
import {Component} from '@angular/core';
import {Geolocation} from 'ionic-native';

declare var google;

@Component({
  templateUrl: 'build/pages/lookup-grades/lookup-grades.html'
})
export class LookupGradesPage {
  public studentNumber: string;
  public studentClass: string;
  public currentCenterLocation: {
    latitude: number,
    longitude: number,
    centerName: string
  };
  public chosenStudentNumber: string;
  // public loadCenterMap: boolean = false;
  public map;
  public studentGradeDetail = null;

  constructor(private _nav: NavController, private _http: Http) { }

  public searchForGrades() {
    if (!this.validate()) {
      return false;
    }

    let loading = Loading.create({
      content: "Fetching...",
    });

    this._nav.present(loading);

    this._http.get(`https://mehe.firebaseio.com/scores/${this.studentClass}/${this.studentNumber}.json`)
      .map(res => res.json())
      .subscribe((data) => {
        this.studentGradeDetail = data;
      }, (error) => {
        console.log(error);
      }, () => {
        if (this.studentGradeDetail === null) {
          window.alert(`رقم المرشح ${this.studentNumber} غير موجود`);
          this.currentCenterLocation = null;
          loading.dismiss();
        } else if (!this.studentGradeDetail.grand_total) {
          window.alert(`النتائج لم تصدر بعد`);
          this.getCenterLocation(this.studentGradeDetail.centerID, loading);
          this.studentGradeDetail = null;
        } else {
          this.chosenStudentNumber = this.studentNumber;
          this.getSchoolInfo(this.studentGradeDetail.schoolID, loading);
        }
      });
  }

  public getDirections() {
    let loader = Loading.create({
      content: "Getting directions",
      duration: 6000
    });

    this._nav.present(loader);

    let centerlatLng = new google.maps.LatLng(this.currentCenterLocation.latitude, this.currentCenterLocation.longitude);

    let directions = {
      origin: null,
      destination: centerlatLng,
      showList: false
    };

    Geolocation.getCurrentPosition().then((resp) => {
      let userlatlng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      directions.origin = userlatlng;
      let directionsDisplay = new google.maps.DirectionsRenderer();
      let directionsService = new google.maps.DirectionsService();
      // let geocoder = new google.maps.Geocoder();

      let request = {
        origin: directions.origin,
        destination: directions.destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      };

      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          directionsDisplay.setMap(this.map);
          directionsDisplay.setPanel(document.getElementById('directionsList'));
          directions.showList = true;
          loader.dismiss();
        } else {
          alert('Google route unsuccesfull!');
        }
      });
    }, (error) => {
      console.log(error);
      if (error.code === 1) {
        window.alert("Please allow the application to use your location");
      }
      loader.dismiss();
    });
  }

  private getSchoolInfo(schoolId: string, loading: Loading) {
    this._http.get(`https://mehe.firebaseio.com/schools/${schoolId}.json`)
      .map(res => res.json())
      .subscribe((school) => {
        this.studentGradeDetail.schoolName = school.schoolName;
      }, (error) => {
        console.log(error);
      }, () => {
        loading.dismiss();
      });
  }

  private validate() {
    if (!this.studentClass || !this.studentNumber) {
      window.alert("Please fill all fields!");
      return false;
    }
    return true;
  }

  private getCenterLocation(centerId: string, loading: Loading) {
    this._http.get(`https://mehe.firebaseio.com/centers/${centerId}.json`)
      .map(res => res.json())
      .subscribe((centerInfo) => {
        this.currentCenterLocation = {
          latitude: centerInfo.latitude,
          longitude: centerInfo.longitude,
          centerName: centerInfo.name
        };
      }, (error) => {
        loading.dismiss();
        console.log(error);
      }, () => {
        loading.dismiss();
        this.loadMap(
          this.currentCenterLocation.latitude,
          this.currentCenterLocation.longitude,
          this.currentCenterLocation.centerName);
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
