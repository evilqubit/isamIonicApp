import {Page, NavController} from "ionic-angular";
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

import {NewsDetailsPage} from "../news-details/news-details";

@Page({
    templateUrl: "build/pages/category-news/category-news.page.html",
})

export class CategoryNewsPage {
    public categoryName: string;
    public cachedNews: Object;
    constructor(public nav: NavController, private _http: Http) {
        this.categoryName = "Test"
    }

    onPageLoaded() {
        this.getCachedNews();
    }

    public goToDetails(objectId: string) {
        this.nav.push(NewsDetailsPage, {
            objectId: objectId
        });
    }

    private getCachedNews() {
        let headers = new Headers();
        headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
        headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

        this._http.get("https://api.parse.com/1/classes/Cache", {
            headers: headers
        }).map(res => res.json())
            .subscribe(data => this.cachedNews = data.results,
            (err) => console.log(err),
            () => {
                console.log(this.cachedNews);
                console.log("Success");
            });
    }
}
