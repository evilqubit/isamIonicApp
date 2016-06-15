import {NavController, Loading} from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {Component} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: 'build/pages/resources/resources.html'
})
export class ResourcesPage {
  public resources;
  constructor(private _nav: NavController, private _http: Http) { }

  public ionViewLoaded() {
    this.getResources();
  }

  public downloadFile(file) {
    window.open(file.fileUrl, '_system');
  }

  private getResources() {
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this._nav.present(loading);

    let headers = new Headers();
    headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");
    this._http.get(`https://api.parse.com/1/classes/File`, {
      headers: headers
    }).map(res => res.json())
      .subscribe((data) => {
        this.resources = data.results;
        console.log(data);
      }, (error) => {
        console.log(error);
      }, () => {
        loading.dismiss();
      });
  }
}
