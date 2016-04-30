import {Page, NavController, NavParams, Loading} from "ionic-angular";
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

import {NewsDetailsPage} from "../news-details/news-details";

@Page({
  templateUrl: "build/pages/category-news/category-news.page.html",
})

export class CategoryNewsPage {
  public categoryName: string;
  public cachedNews = [];
  public categoryClassName: string;
  public categoryObjectId;
  constructor(public _nav: NavController, private _http: Http, private _params: NavParams) {
  }

  onPageLoaded() {
    this.categoryName = this._params.get("categoryName")
    this.categoryObjectId = this._params.get("categoryObjectId");
    this.categoryClassName = this._params.get('categoryClassName');
    this.getCategoryNews();
  }

  public goToDetails(objectId: string) {
    this._nav.push(NewsDetailsPage, {
      objectId: objectId
    });
  }

  private getSubCategories() {

  }

  private getCategoryNews() {
    let loading = Loading.create({
      content: 'Please wait...'
    });

    this._nav.present(loading);


    let headers = new Headers();
    headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/News?where={"${this.categoryClassName==="Category" ? "catId" : "subCatId" }":{"__type": "Pointer","className": "${this.categoryClassName}","objectId": "${this.categoryObjectId}"}}`, {
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
