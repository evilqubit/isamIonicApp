import {Page, NavController, Loading} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';

//Custom imports
import {CategoriesListPage} from "../categories-list/categories-list";
import {CategoryNewsPage} from "../category-news/category-news";
import {NewsDetailsPage} from "../news-details/news-details";

@Page({
    templateUrl: 'build/pages/landing/landing.page.html'
})
export class LandingPage {
    public categoriesPage = CategoriesListPage;
    public categoryNewsPage = CategoryNewsPage;
    public newsDetailsPage = NewsDetailsPage;
    public response;
    constructor(private _http: Http, private _nav: NavController) { }

    onPageLoaded() {
        // this.getCategories();
    }

    private getCategories() {
        let loading = Loading.create({
          content: "Loading..."
        })

        this._nav.present(loading);

        // https://api.parse.com/1/classes/Category
        let requestHeaders = new Headers();
        requestHeaders.append("X-Parse-Application-Id", "MHY6vxyEIi4SiBZthoSjRib3WLloBwYz9nVXcsou");
        requestHeaders.append("X-Parse-REST-API-Key", "M33K2sDFgY0yT3IniowcLnlKuPqxUgSB6qEmYwmx");

        this._http.get('https://api.parse.com/1/classes/Category', {
            headers: requestHeaders
        }).map(res => res.json())
            .subscribe(data => this.response = data.results,
            error => console.log(error),
            () => {
                loading.dismiss();
                console.log("Success");
            });
    }

    public showCategoryNews(name, objectId) {
        this._nav.push(CategoryNewsPage, {
            categoryName: name,
            categoryObjectId: objectId
        });
    }
}
