import {Page, NavController, NavParams, Loading} from "ionic-angular";
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

import {NewsDetailsPage} from "../news-details/news-details";

@Page({
  templateUrl: "build/pages/category-news/category-news.page.html",
})

export class CategoryNewsPage {
  public categoryObject: Object;
  public subsubcats: Array<Object>;
  public newsFilter: string;
  public cachedNews = [];
  constructor(public _nav: NavController, private _http: Http, private _params: NavParams) {
  }

  onPageLoaded() {
    this.categoryObject = this._params.get("categoryObject");
    this.subsubcats = this.categoryObject.subsubcat;

    console.log(this.categoryObject);
    this.getCategoryNews();
  }

  public goToDetails(newsObject) {
    this._nav.push(NewsDetailsPage, {
      newsObject: newsObject
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

    this._http.get(`https://api.parse.com/1/classes/News?where={"subCatId":{"__type": "Pointer","className": "${this.categoryObject.className}","objectId": "${this.categoryObject.objectId}"}}`, {
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

  public filterNews() {
     let loading = Loading.create({
      content: 'Please wait...'
    });

    this._nav.present(loading);

    let headers = new Headers();
    headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/News?where={"subSubCatId":{"__type": "Pointer","className": "SubSubCategory","objectId": "${this.newsFilter}"}}`, {
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
}
