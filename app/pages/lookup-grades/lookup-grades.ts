import {Page, NavController, Loading} from 'ionic-angular';
import {Http} from 'angular2/http';
import {Geolocation} from 'ionic-native';

declare var google;

@Page({
  templateUrl: 'build/pages/lookup-grades/lookup-grades.html'
})
export class LookupGradesPage {
  public studentNumber: string;
  public studentClass: string;
  public currentCenterLocation : {
    latitude: number,
    longitude: number,
    centerName: string
  };
  // public loadCenterMap: boolean = false;
  public map;
  public studentGradeDetail = null;

  constructor(private _nav: NavController, private _http: Http) { }

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
          loading.dismiss();
          window.alert("Student not found!");
          return false;
        }
        this.getSchoolInfo(this.studentGradeDetail.schoolID, loading);
      });
  }

  public getDirections() {
    let loader = Loading.create({
      content: "Getting directions"
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
    });
  }

  private getSchoolInfo(schoolId, loader) {
    this._http.get(`https://mehe.firebaseio.com/schools/${schoolId}.json`)
      .map(res => res.json())
      .subscribe((school) => {
        this.studentGradeDetail.schoolName = school.schoolName;
      }, (error) => {
        console.log(error);
      }, () => {
        loader.dismiss();
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
    this._http.get(`https://mehe.firebaseio.com/centers/${centerId}.json`)
      .map(res => res.json())
      .subscribe((centerInfo) => {
        this.currentCenterLocation = {
          latitude: centerInfo.latitude,
          longitude: centerInfo.longitude,
          centerName: centerInfo.name
        };
      }, (error) => {
        console.log(error);
      }, () => {
        this.loadMap(this.currentCenterLocation.latitude, this.currentCenterLocation.longitude, this.currentCenterLocation.centerName);
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
