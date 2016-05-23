import {Page, NavController, NavParams, Loading} from "ionic-angular";
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

//Custom Imports
import {TruncatePipe} from "../../pipes/truncate";
import {NewsDetailsPage} from "../news-details/news-details";
import { UserPreference } from '../../providers/user-preference/user-preference';

@Page({
  templateUrl: "build/pages/category-news/category-news.page.html",
  pipes: [TruncatePipe]
})

export class CategoryNewsPage {
  public categoryObject: Object;
  public subsubcats: Array<Object>;
  public newsFilter: string;
  public cachedNews = [];
  constructor(public _nav: NavController, private _http: Http, private _params: NavParams, private _userPref: UserPreference) {
    this.newsFilter = "All";
  }

  public onPageLoaded() {
    this.categoryObject = this._params.get("categoryObject");
    this.subsubcats = this.categoryObject.subsubcat;
    this.setNameByLanguage();

    console.log(this.categoryObject);
    this.getCategoryNews();
  }

  public goToDetails(newsObject) {
    this._nav.push(NewsDetailsPage, {
      newsObject: newsObject
    });
  }

  public filterNews() {

    if (this.newsFilter === "All") {
      this.getCategoryNews();
      return true;
    }

    let loading = Loading.create({
      content: 'Please wait...'
    });

    this._nav.present(loading);

    let headers = new Headers();
    headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/News?where={
      "subSubCatId":{
        "__type": "Pointer","className": "SubSubCategory","objectId": "${this.newsFilter}"
        }, "langId": ${this._userPref.getSelectedLanguage().id}
      }`, {
        headers: headers
      }).map(res => res.json())
      .subscribe(data => this.cachedNews = data.results,
      (err) => console.log(err),
      () => {
        console.log(this.cachedNews);
        console.log("Success");
        loading.dismiss();
      });
  }

  private getCategoryNews() {
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this._nav.present(loading);

    let headers = new Headers();
    headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/News?where={
      "subCatId":{
        "__type": "Pointer","className": "${this.categoryObject.className}","objectId": "${this.categoryObject.objectId}"
      },"langId": ${this._userPref.getSelectedLanguage().id}
    }`, {
        headers: headers
      }).map(res => res.json())
      .subscribe((data) => {
        this.cachedNews = data.results;
      },
      (err) => console.log(err),
      () => {
        console.log(this.cachedNews);
        console.log("Success");
        loading.dismiss();
      });
  }

  private setNameByLanguage() {
    for (let i = 0; i < this.subsubcats.length; i++) {
      if (this._userPref.getSelectedLanguage().name === 'Francais') {
        this.subsubcats[i].SubSubName = this.subsubcats[i].SubSubNameFr;
      } else if (this._userPref.getSelectedLanguage().name === 'العربية') {
        this.subsubcats[i].SubSubName = this.subsubcats[i].SubSubNameAr;
      }
    }
  }
}
