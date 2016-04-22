import {Page, NavController, NavParams, Loading} from "ionic-angular";
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
    templateUrl: "build/pages/news-details/news-details.page.html",
})
export class NewsDetailsPage {
    public newsDetails: Object = {
        newsTitle: '',
        longContent: ''
    };
    private objectId: string;

    constructor(private _http: Http, private _nav: NavController, private _navParams: NavParams) {

    }

    onPageLoaded() {
        this.objectId = this._navParams.get("objectId");
        this.getNewsDetails();
    }

    private getNewsDetails() {
        let loading = Loading.create({
            content: 'Please wait...'
        });

        this._nav.present(loading);

        let headers = new Headers();
        headers.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
        headers.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

        this._http.get(`https://api.parse.com/1/classes/News?where={"objectId":"${this.objectId}"}`, {
            headers: headers
        }).map(res => res.json())
            .subscribe(data => this.newsDetails = data.results[0],
            (err) => console.log(err),
            () => {
                console.log(this.newsDetails);
                this.newsDetails.longContent = JSON.parse(this.newsDetails.longContent)[1].text;
                console.log("Success");
                loading.dismiss();
            });
    }
}
