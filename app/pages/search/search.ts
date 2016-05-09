import {Page, NavController, Loading} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';

//Custom imports
import {TruncatePipe} from "../../pipes/truncate";
import {NewsDetailsPage} from "../news-details/news-details";
/*
  Generated class for the SearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/search/search.html',
  pipes: [TruncatePipe]
})
export class SearchPage {
  public searchContent: string;
  public searchResults;
  constructor(public _nav: NavController, private _http: Http) {
    this.searchContent = '';
    this.searchResults = [];
  }

  public search(event) {

    if (this.searchContent === '') {
      return false;
    }

    let loader = Loading.create({
      content: "Searching",
    });

    this._nav.present(loader);

    let searchHeaders = new Headers();
    searchHeaders.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
    searchHeaders.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

    this._http.get(`https://api.parse.com/1/classes/News?where={"searchContent":{"$regex":"\\\\Q${this.searchContent}\\\\E","$options":"i"}}`, {
      headers: searchHeaders
    }).map(res => res.json())
      .subscribe((data) => {
        this.searchResults = data.results;
        console.log(this.searchResults);
      }, (error) => {
        window.alert("An error has occurred!");
        loader.dismiss();
        console.log(error)
      },
      () => {
        loader.dismiss();
        console.log("done");
      });
  }

  public goToDetails(newsObject) {
    this._nav.push(NewsDetailsPage, {
      newsObject: newsObject
    });
  }
}
