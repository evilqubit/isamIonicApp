import {Page, NavParams} from "ionic-angular";
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
    templateUrl: "build/pages/news-details/news-details.page.html",
})
export class NewsDetailsPage {
    public newsDetails: Object;
    private objectId: string;

    constructor(private _http: Http, private _navParams: NavParams) {

    }

    onPageLoaded() {
        this.objectId = this._navParams.get("objectId");
        this.getNewsDetails();
    }

    private getNewsDetails() {
        let headers = new Headers();
        headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
        headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");
        headers.append("X-Parse-Session-Token", "r:RnQWzeLiYXD5CkF21EypBmx6H");

        this._http.get(`https://api.parse.com/1/classes/News?where={"status":1,"objectId":"${this.objectId}"}`, {
            headers: headers
        }).map(res => res.json())
            .subscribe(data => this.newsDetails = data.results,
            (err) => console.log(err),
            () => {
                console.log(this.newsDetails);
                console.log("Success");
            });
    }
}
