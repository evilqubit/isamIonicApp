import {Page, NavController, NavParams, Loading} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

import {NewsDetailsPage} from "../news-details/news-details";

@Page({
    templateUrl: 'build/pages/categories-list/categories-list.page.html'
})
export class CategoriesListPage {
    public cachedNews: Object;
    constructor(private _nav: NavController, private _http: Http) {
    }

    onPageLoaded() {
        this.getCachedNews();
    }

    public goToDetails(objectId: string) {
        this._nav.push(NewsDetailsPage, {
            objectId: objectId
        });
    }

    private getCachedNews() {
        let loading = Loading.create({
            content: 'Please wait...'
        });

        this._nav.present(loading);


        let headers = new Headers();
        headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
        headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

        this._http.get(`https://api.parse.com/1/classes/News`, {
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
